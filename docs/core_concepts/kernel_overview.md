# Пакет duit_kernel

Библиотека flutter_duit зависит от пакета [duit_kernel](https://github.com/Duit-Foundation/duit_kernel). Он содержит базовые интерфейсы и
классы, которые служат для стандартизации реализации базовых элементов фреймворка. Этот пакет решает
несколько важных проблем:

- Отделение интерфейсов от реализаций для более гибкой разработки.
- Предоставление возможности создавать собственные реализации фреймворка в рамках заданного контракта.
- Возможность писать собственные расширения функционала фреймворка без необходимости
  прямой зависимости от flutter_duit. [Пример](https://github.com/Duit-Foundation/duit_hetu_extension).

Подобное разделение фреймворка на две библиотеки, которые обновляются по разным причинам, создает более стабильный дизайн решения.

:::info
Начиная с версии v3.0.0 пакета duit_kernel, необходимые клиентской стороне сущности экспортируются пакетом flutter_duit. Это позволило избавиться от необходимости вручную добавлять в зависимости проекта kernel.
:::

## Capability Delegates — модульная архитектура драйвера

### Концепция

Начиная с последних версий duit_kernel, API фреймворка организован с использованием **Capability Delegates** — паттерна, основанного на Dart mixins. Это позволяет декомпозировать функциональность `UIDriver` на независимые, взаимозаменяемые модули.

**Capability Delegate** — это mixin, определяющий контракт для конкретной области функциональности драйвера. Каждый delegate:

- Объявляет набор методов с аннотацией `@mustBeOverridden`
- Реализует интерфейс `DriverRefHolder` для получения ссылки на драйвер
- Предоставляет метод `releaseResources()` для корректной очистки ресурсов

### Архитектура

Абстрактный класс `UIDriver` в duit_kernel объявлен следующим образом:

```dart
abstract class UIDriver
    with
        FocusCapabilityDelegate,
        ServerActionExecutionCapabilityDelegate,
        UIControllerCapabilityDelegate,
        ViewModelCapabilityDelegate,
        TransportCapabilityDelegate,
        ScriptingCapabilityDelegate,
        LoggingCapabilityDelegate,
        NativeModuleCapabilityDelegate {
  // ...
}
```

Каждый mixin определяет контракт для своей области ответственности. По умолчанию все методы выбрасывают `MissingCapabilityMethodImplementation`, что гарантирует явную реализацию необходимого функционала.

### Список Capability Delegates

| Delegate | Назначение |
|----------|------------|
| `ViewModelCapabilityDelegate` | Управление view-моделями, событиями UI, парсинг layout-структур |
| `TransportCapabilityDelegate` | Транспортный слой (HTTP, WebSocket, статический контент) |
| `ServerActionExecutionCapabilityDelegate` | Выполнение серверных действий и обработка событий |
| `UIControllerCapabilityDelegate` | Управление контроллерами UI-элементов (TextField, Checkbox и др.) |
| `FocusCapabilityDelegate` | Управление фокусом и навигацией по элементам |
| `ScriptingCapabilityDelegate` | Выполнение встраиваемых скриптов |
| `LoggingCapabilityDelegate` | Логирование с поддержкой различных уровней |
| `NativeModuleCapabilityDelegate` | Взаимодействие с нативным кодом через MethodChannel |

### Связывание с драйвером

Каждый delegate реализует интерфейс `DriverRefHolder`:

```dart
abstract interface class DriverRefHolder {
  void linkDriver(UIDriver driver);
}
```

Метод `linkDriver` вызывается при инициализации драйвера, позволяя delegates получить доступ к другим capabilities через ссылку на драйвер. Это обеспечивает координацию между модулями без жёсткой связности.

### Композиция в flutter_duit

В пакете flutter_duit для каждого delegate существует конкретная реализация:

| Delegate | Реализация в flutter_duit |
|----------|---------------------------|
| `ViewModelCapabilityDelegate` | `DuitViewManager` |
| `TransportCapabilityDelegate` | `HttpTransportManager`, `WsTransportManager`, `StubTransportManager` |
| `ServerActionExecutionCapabilityDelegate` | `DuitActionManager` |
| `UIControllerCapabilityDelegate` | `DuitControllerManager` |
| `FocusCapabilityDelegate` | `DuitFocusNodeManager` |
| `ScriptingCapabilityDelegate` | `DuitStubScriptingManager` (заглушка) |
| `LoggingCapabilityDelegate` | `LoggingManager` |
| `NativeModuleCapabilityDelegate` | `DuitNativeModuleManager` |

Драйвер `DuitDriverCompat` принимает delegates через конструктор с возможностью подмены:

```dart
DuitDriverCompat({
  required TransportCapabilityDelegate transportManager,
  FocusCapabilityDelegate? focusManager,
  ServerActionExecutionCapabilityDelegate? actionManager,
  UIControllerCapabilityDelegate? controllerManager,
  ViewModelCapabilityDelegate? viewManager,
  ScriptingCapabilityDelegate? scriptingManager,
  LoggingCapabilityDelegate? loggingManager,
  NativeModuleCapabilityDelegate? nativeModuleManager,
})
```

При отсутствии явно переданной реализации используются реализации по умолчанию.

### Создание собственных реализаций

Для создания кастомной реализации capability достаточно создать класс с соответствующим mixin:

```dart
final class MyCustomFocusManager with FocusCapabilityDelegate {
  late final UIDriver _driver;

  @override
  void linkDriver(UIDriver driver) => _driver = driver;

  @override
  void requestFocus(String nodeId) {
    // Кастомная логика управления фокусом
  }

  @override
  void releaseResources() {
    // Освобождение ресурсов
  }

  // Реализация остальных методов...
}
```

Затем передать её при создании драйвера:

```dart
final driver = XDriver.remote(
  transportManager: HttpTransportManager(url: 'https://api.example.com'),
  focusManager: MyCustomFocusManager(),
);
```

### Преимущества подхода

1. **Модульность** — каждая область функциональности инкапсулирована в отдельном модуле
2. **Тестируемость** — delegates можно легко заменить mock-объектами
3. **Расширяемость** — новые capabilities добавляются без изменения существующего кода
4. **Гибкость** — можно комбинировать стандартные и кастомные реализации
5. **Separation of Concerns** — чёткое разделение ответственности между компонентами
6. **Независимость от flutter_duit** — расширения (например, [duit_hetu_extension](https://github.com/Duit-Foundation/duit_hetu_extension)) могут реализовывать delegates, завися только от duit_kernel

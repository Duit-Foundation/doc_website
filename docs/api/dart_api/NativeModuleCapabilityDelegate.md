# NativeModuleCapabilityDelegate

Миксин, предоставляющий возможности для управления и взаимодействия с нативным кодом в системе Duit UI.

Классы, использующие этот делегат, должны реализовать методы для обработки взаимодействий с нативными модулями, таких как вызов нативных методов и инициализация модуля.

## Методы

### initNativeModule

```dart
Future<void> initNativeModule();
```

Инициализирует нативный модуль.

### invokeNativeMethod

```dart
Future<T?> invokeNativeMethod<T>(String method, [arguments]);
```

Вызывает нативный метод.

**Параметры:**
- `method` — имя нативного метода для вызова
- `arguments` — дополнительные данные для метода (опционально)

**Возвращает:** Результат вызова нативного метода типа `T`.

### releaseResources

```dart
void releaseResources();
```

Освобождает ресурсы делегата.

## Пример реализации

```dart
final class MyNativeModuleManager with NativeModuleCapabilityDelegate {
  static const _channel = MethodChannel('com.example.app/native');

  @override
  Future<void> initNativeModule() async {
    // Инициализация нативного модуля
    await _channel.invokeMethod('init');
  }

  @override
  Future<T?> invokeNativeMethod<T>(String method, [arguments]) async {
    return await _channel.invokeMethod<T>(method, arguments);
  }

  @override
  void releaseResources() {
    // Очистка ресурсов
  }
}
```

## Использование с XDriver

```dart
final driver = XDriver.nativeModule(
  nativeModuleManager: MyNativeModuleManager(),
  initialRequestPayload: {
    'hostVersion': '1.0.0',
  },
);
```

## Типичные сценарии использования

- Интеграция Duit как модуля в существующее нативное приложение
- Вызов платформо-специфичных функций (камера, файловая система, сенсоры)
- Обмен данными между Duit UI и нативным кодом хост-приложения
- Использование нативных SDK и библиотек

:::tip
Режим нативного модуля идеально подходит для постепенной миграции существующих приложений на Duit или для встраивания динамических UI-экранов в нативные приложения.
:::

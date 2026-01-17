# UIDriver

Абстрактный класс, представляющий интерфейс драйвера Duit.

`UIDriver` объединяет все capability delegates через миксины и предоставляет базовый интерфейс для управления представлением Duit.

:::tip
Для создания драйвера рекомендуется использовать [XDriver](/docs/api/dart_api/XDriver), который предоставляет удобный публичный API.
:::

## Структура

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
  
  /// Инициализирует драйвер.
  Future<void> init();

  /// Освобождает ресурсы драйвера.
  void dispose();

  /// Флаг, указывающий, работает ли драйвер в режиме нативного модуля.
  abstract bool isModule;
}
```

## Capability Delegates

`UIDriver` включает следующие capability delegates:

| Делегат | Описание |
|---------|----------|
| [FocusCapabilityDelegate](/docs/api/dart_api/FocusCapabilityDelegate) | Управление фокусом UI-элементов |
| [ServerActionExecutionCapabilityDelegate](/docs/api/dart_api/ServerActionExecutionCapabilityDelegate) | Выполнение серверных действий и обработка событий |
| [UIControllerCapabilityDelegate](/docs/api/dart_api/UIControllerCapabilityDelegate) | Управление контроллерами UI-элементов |
| [ViewModelCapabilityDelegate](/docs/api/dart_api/ViewModelCapabilityDelegate) | Управление моделями представления |
| [TransportCapabilityDelegate](/docs/api/dart_api/TransportCapabilityDelegate) | Транспортный слой |
| [ScriptingCapabilityDelegate](/docs/api/dart_api/ScriptingCapabilityDelegate) | Выполнение скриптов |
| [LoggingCapabilityDelegate](/docs/api/dart_api/LoggingCapabilityDelegate) | Логирование |
| [NativeModuleCapabilityDelegate](/docs/api/dart_api/NativeModuleCapabilityDelegate) | Взаимодействие с нативным кодом |

## Deprecated свойства

Следующие свойства помечены как deprecated и будут удалены в следующем мажорном релизе:

- `source` — URL источника драйвера
- `transportOptions` — опции транспорта
- `transport` — экземпляр транспорта
- `scriptRunner` — экземпляр ScriptRunner
- `eventResolver` — резолвер событий
- `actionExecutor` — исполнитель действий
- `externalEventHandler` — обработчик внешних событий
- `driverChannel` — канал для нативной коммуникации
- `logger` — логгер (используйте `LoggingCapabilityDelegate`)
- `build()` — метод построения UI

## См. также

- [XDriver](/docs/api/dart_api/XDriver) — публичный API для работы с драйвером
- [DuitViewHost](/docs/api/dart_api/DuitViewHost) — виджет-хост для Duit-представления

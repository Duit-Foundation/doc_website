# UIDriver

Abstract class representing the Duit driver interface.

`UIDriver` combines all capability delegates through mixins and provides a base interface for managing Duit presentations.

:::tip
For creating a driver, it's recommended to use [XDriver](/docs/api/dart_api/XDriver), which provides a convenient public API.
:::

## Structure

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
  
  /// Initializes the driver.
  Future<void> init();

  /// Releases driver resources.
  void dispose();

  /// Flag indicating whether the driver is running in native module mode.
  abstract bool isModule;
}
```

## Capability Delegates

`UIDriver` includes the following capability delegates:

| Delegate | Description |
|----------|-------------|
| [FocusCapabilityDelegate](/docs/api/dart_api/FocusCapabilityDelegate) | UI element focus management |
| [ServerActionExecutionCapabilityDelegate](/docs/api/dart_api/ServerActionExecutionCapabilityDelegate) | Server action execution and event handling |
| [UIControllerCapabilityDelegate](/docs/api/dart_api/UIControllerCapabilityDelegate) | UI element controller management |
| [ViewModelCapabilityDelegate](/docs/api/dart_api/ViewModelCapabilityDelegate) | View model management |
| [TransportCapabilityDelegate](/docs/api/dart_api/TransportCapabilityDelegate) | Transport layer |
| [ScriptingCapabilityDelegate](/docs/api/dart_api/ScriptingCapabilityDelegate) | Script execution |
| [LoggingCapabilityDelegate](/docs/api/dart_api/LoggingCapabilityDelegate) | Logging |
| [NativeModuleCapabilityDelegate](/docs/api/dart_api/NativeModuleCapabilityDelegate) | Native code interaction |

## Deprecated Properties

The following properties are marked as deprecated and will be removed in the next major release:

- `source` — driver source URL
- `transportOptions` — transport options
- `transport` — transport instance
- `scriptRunner` — ScriptRunner instance
- `eventResolver` — event resolver
- `actionExecutor` — action executor
- `externalEventHandler` — external event handler
- `driverChannel` — native communication channel
- `logger` — logger (use `LoggingCapabilityDelegate`)
- `build()` — UI building method

## See Also

- [XDriver](/docs/api/dart_api/XDriver) — public API for working with the driver
- [DuitViewHost](/docs/api/dart_api/DuitViewHost) — host widget for Duit presentation

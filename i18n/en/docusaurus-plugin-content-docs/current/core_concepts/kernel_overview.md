# The duit_kernel Package

The flutter_duit library depends on the [duit_kernel](https://github.com/Duit-Foundation/duit_kernel) package. It contains fundamental interfaces and classes that standardize the implementation of core framework elements. This package addresses several critical challenges:

- Separates interfaces from implementations for more flexible development.
- Provides the ability to create custom framework implementations within predefined contracts.
- Enables writing custom framework extensions without requiring a direct dependency on flutter_duit. [Example](https://github.com/Duit-Foundation/duit_hetu_extension).

Splitting the framework into two libraries, each updated for different reasons, results in a more stable design.

:::info
Starting from version v3.0.0 of the duit_kernel package, entities required by the client side are exported by the flutter_duit package. This eliminates the need to manually add kernel to your project's dependencies.
:::

## Capability Delegates — Modular Driver Architecture

### Concept

Starting from recent versions of duit_kernel, the framework API is organized using **Capability Delegates** — a pattern based on Dart mixins. This allows decomposing `UIDriver` functionality into independent, interchangeable modules.

A **Capability Delegate** is a mixin that defines a contract for a specific area of driver functionality. Each delegate:

- Declares a set of methods annotated with `@mustBeOverridden`
- Implements the `DriverRefHolder` interface to obtain a reference to the driver
- Provides a `releaseResources()` method for proper resource cleanup

### Architecture

The abstract `UIDriver` class in duit_kernel is declared as follows:

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

Each mixin defines a contract for its area of responsibility. By default, all methods throw `MissingCapabilityMethodImplementation`, ensuring explicit implementation of required functionality.

### List of Capability Delegates

| Delegate | Purpose |
|----------|---------|
| `ViewModelCapabilityDelegate` | View model management, UI events, layout structure parsing |
| `TransportCapabilityDelegate` | Transport layer (HTTP, WebSocket, static content) |
| `ServerActionExecutionCapabilityDelegate` | Server action execution and event handling |
| `UIControllerCapabilityDelegate` | UI element controller management (TextField, Checkbox, etc.) |
| `FocusCapabilityDelegate` | Focus management and element navigation |
| `ScriptingCapabilityDelegate` | Embedded script execution |
| `LoggingCapabilityDelegate` | Logging with support for different levels |
| `NativeModuleCapabilityDelegate` | Native code interaction via MethodChannel |

### Linking to the Driver

Each delegate implements the `DriverRefHolder` interface:

```dart
abstract interface class DriverRefHolder {
  void linkDriver(UIDriver driver);
}
```

The `linkDriver` method is called during driver initialization, allowing delegates to access other capabilities through the driver reference. This enables coordination between modules without tight coupling.

### Composition in flutter_duit

The flutter_duit package provides a concrete implementation for each delegate:

| Delegate | flutter_duit Implementation |
|----------|----------------------------|
| `ViewModelCapabilityDelegate` | `DuitViewManager` |
| `TransportCapabilityDelegate` | `HttpTransportManager`, `WsTransportManager`, `StubTransportManager` |
| `ServerActionExecutionCapabilityDelegate` | `DuitActionManager` |
| `UIControllerCapabilityDelegate` | `DuitControllerManager` |
| `FocusCapabilityDelegate` | `DuitFocusNodeManager` |
| `ScriptingCapabilityDelegate` | `DuitStubScriptingManager` (stub) |
| `LoggingCapabilityDelegate` | `LoggingManager` |
| `NativeModuleCapabilityDelegate` | `DuitNativeModuleManager` |

The `DuitDriverCompat` driver accepts delegates through the constructor with substitution capability:

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

When no explicit implementation is provided, default implementations are used.

### Creating Custom Implementations

To create a custom capability implementation, simply create a class with the corresponding mixin:

```dart
final class MyCustomFocusManager with FocusCapabilityDelegate {
  late final UIDriver _driver;

  @override
  void linkDriver(UIDriver driver) => _driver = driver;

  @override
  void requestFocus(String nodeId) {
    // Custom focus management logic
  }

  @override
  void releaseResources() {
    // Resource cleanup
  }

  // Implementation of remaining methods...
}
```

Then pass it when creating the driver:

```dart
final driver = XDriver.remote(
  transportManager: HttpTransportManager(url: 'https://api.example.com'),
  focusManager: MyCustomFocusManager(),
);
```

### Advantages of This Approach

1. **Modularity** — each functional area is encapsulated in a separate module
2. **Testability** — delegates can easily be replaced with mock objects
3. **Extensibility** — new capabilities can be added without modifying existing code
4. **Flexibility** — standard and custom implementations can be combined
5. **Separation of Concerns** — clear separation of responsibilities between components
6. **Independence from flutter_duit** — extensions (e.g., [duit_hetu_extension](https://github.com/Duit-Foundation/duit_hetu_extension)) can implement delegates depending only on duit_kernel

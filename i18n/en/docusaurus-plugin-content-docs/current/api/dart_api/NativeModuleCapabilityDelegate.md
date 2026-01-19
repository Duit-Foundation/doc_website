# NativeModuleCapabilityDelegate

A mixin that provides capabilities for managing and interacting with native code in the Duit UI system.

Classes using this delegate must implement methods for handling native module interactions, such as invoking native methods and initializing the module.

## Methods

### initNativeModule

```dart
Future<void> initNativeModule();
```

Initializes the native module.

### invokeNativeMethod

```dart
Future<T?> invokeNativeMethod<T>(String method, [arguments]);
```

Invokes a native method.

**Parameters:**
- `method` — name of the native method to invoke
- `arguments` — additional data for the method (optional)

**Returns:** Result of the native method call of type `T`.

### releaseResources

```dart
void releaseResources();
```

Releases delegate resources.

## Implementation Example

```dart
final class MyNativeModuleManager with NativeModuleCapabilityDelegate {
  static const _channel = MethodChannel('com.example.app/native');

  @override
  Future<void> initNativeModule() async {
    // Initialize native module
    await _channel.invokeMethod('init');
  }

  @override
  Future<T?> invokeNativeMethod<T>(String method, [arguments]) async {
    return await _channel.invokeMethod<T>(method, arguments);
  }

  @override
  void releaseResources() {
    // Cleanup resources
  }
}
```

## Using with XDriver

```dart
final driver = XDriver.nativeModule(
  nativeModuleManager: MyNativeModuleManager(),
  initialRequestPayload: {
    'hostVersion': '1.0.0',
  },
);
```

## Typical Use Cases

- Integrating Duit as a module into an existing native application
- Calling platform-specific functions (camera, file system, sensors)
- Exchanging data between Duit UI and native host application code
- Using native SDKs and libraries

:::tip
Native module mode is ideal for gradual migration of existing applications to Duit or for embedding dynamic UI screens into native applications.
:::

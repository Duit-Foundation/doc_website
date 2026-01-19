# DuitViewHost

The `DuitViewHost` widget is responsible for initializing the associated driver and subscribing to widget tree updates during Duit's operation.

## Constructors

### DuitViewHost

Main constructor accepting a `UIDriver` (automatically wrapped in `XDriver`).

```dart
DuitViewHost({
  required UIDriver driver,
  Widget? placeholder,
  Widget? child,
  bool invertStack = false,
  bool showChildInsteadOfPlaceholder = false,
  GestureInterceptor? gestureInterceptor,
  GestureInterceptorBehavior gestureInterceptorBehavior = GestureInterceptorBehavior.onlyWithAction,
  Widget Function(BuildContext context, Object? err)? errorWidgetBuilder,
  String viewTag = "",
  SliverGridDelegatesRegistry sliverGridDelegatesRegistry = const {},
});
```

### DuitViewHost.withDriver

Constructor for use with [XDriver](/docs/api/dart_api/XDriver) directly.

```dart
const DuitViewHost.withDriver({
  required XDriver driver,
  // ... other parameters are the same
});
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `driver` | `UIDriver` / `XDriver` | — | Driver managing the presentation (required) |
| `placeholder` | `Widget?` | `null` | Placeholder widget during loading |
| `child` | `Widget?` | `null` | Child widget to overlay on the Duit presentation |
| `invertStack` | `bool` | `false` | Widget order in Stack (true = child on top) |
| `showChildInsteadOfPlaceholder` | `bool` | `false` | Show child instead of placeholder |
| `gestureInterceptor` | `Function?` | `null` | Gesture interceptor |
| `errorWidgetBuilder` | `Function?` | `null` | Function to build error widget |
| `viewTag` | `String` | `""` | Tag for presentation identification |
| `sliverGridDelegatesRegistry` | `Map` | `{}` | Registry of delegates for SliverGrid |

## Usage Examples

### Basic Usage

```dart
class MyScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final driver = XDriver.remote(
      transportManager: HttpTransportManager(
        url: '/api/layout',
        baseUrl: 'https://api.example.com',
      ),
    );

    return DuitViewHost.withDriver(
      driver: driver,
      placeholder: const Center(
        child: CircularProgressIndicator(),
      ),
    );
  }
}
```

### With Error Handling

```dart
DuitViewHost.withDriver(
  driver: driver,
  placeholder: const CircularProgressIndicator(),
  errorWidgetBuilder: (context, error) {
    return Center(
      child: Text('Loading error: $error'),
    );
  },
);
```

### With Gesture Interceptor

```dart
DuitViewHost.withDriver(
  driver: driver,
  gestureInterceptor: (gestureType, action, data) {
    print('Gesture: $gestureType, Action: $action');
  },
  gestureInterceptorBehavior: GestureInterceptorBehavior.always,
);
```

:::tip
For manual widget lifecycle management, use `driver.init()` and `driver.dispose()` methods in the corresponding `State` methods.
:::

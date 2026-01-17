# ViewModelCapabilityDelegate

A mixin that provides capabilities for managing and interacting with views in the Duit UI system.

Allows classes to interact with drivers, respond to UI events, and manage view lifecycle.

## Methods

### eventStream

```dart
Stream<UIDriverEvent> get eventStream;
```

Stream of driver events (`UIDriverEvent`) managed by the delegate.

Used for listening to driver events and updating state in response.

### buildContext

```dart
BuildContext get buildContext;
```

The current `BuildContext` associated with the driver.

### context (setter)

```dart
set context(BuildContext value);
```

Sets the current `BuildContext` for the delegate.

### addUIDriverEvent

```dart
void addUIDriverEvent(UIDriverEvent event);
```

Adds a `UIDriverEvent` to the event stream.

### addUIDriverError

```dart
void addUIDriverError(Object error, [StackTrace? stackTrace]);
```

Reports an error that occurred in the driver context.

### notifyWidgetDisplayStateChanged

```dart
void notifyWidgetDisplayStateChanged(String viewTag, int state);
```

Notifies the driver about widget display state changes.

**Parameters:**
- `viewTag` — widget tag
- `state` — new state (0 = not visible, 1 = visible and displayed)

### isWidgetReady

```dart
bool isWidgetReady(String viewTag);
```

Checks if a widget is ready to be displayed.

### prepareLayout

```dart
Future<DuitView?> prepareLayout(Map<String, dynamic> json);
```

Prepares and validates a layout configuration from JSON, returning a `DuitView` instance.

**Parameters:**
- `json` — layout structure (widgets, properties, relationships)

**Returns:** `DuitView` for further use or `null` for invalid layout.

### currentView

```dart
DuitView? get currentView;
```

Returns the currently displayed view.

### releaseResources

```dart
void releaseResources();
```

Releases delegate resources.

## Usage Example

```dart
final class MyViewManager with ViewModelCapabilityDelegate {
  final _eventController = StreamController<UIDriverEvent>.broadcast();
  BuildContext? _context;
  DuitView? _currentView;

  @override
  Stream<UIDriverEvent> get eventStream => _eventController.stream;

  @override
  BuildContext get buildContext => _context!;

  @override
  set context(BuildContext value) => _context = value;

  @override
  void addUIDriverEvent(UIDriverEvent event) {
    _eventController.add(event);
  }

  @override
  void addUIDriverError(Object error, [StackTrace? stackTrace]) {
    _eventController.addError(error, stackTrace);
  }

  @override
  Future<DuitView?> prepareLayout(Map<String, dynamic> json) async {
    // Parse and prepare layout
    return _currentView;
  }

  @override
  DuitView? get currentView => _currentView;

  @override
  void releaseResources() {
    _eventController.close();
  }

  // ... other methods
}
```

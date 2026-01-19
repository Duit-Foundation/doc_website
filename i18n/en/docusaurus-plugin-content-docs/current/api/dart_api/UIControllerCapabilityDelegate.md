# UIControllerCapabilityDelegate

A mixin that provides an interface for managing UI element controllers in the Duit driver.

Classes using this delegate must implement logic for tracking, attaching, detaching, and updating UI controllers.

## Methods

### attachController

```dart
void attachController(String id, UIElementController controller);
```

Attaches a UI controller to the driver.

Called when a new UI element or interactive widget is created that needs to be tracked by the driver.

**Parameters:**
- `id` — unique controller identifier
- `controller` — [UIElementController](/docs/api/dart_api/UIElementController) instance

### detachController

```dart
void detachController(String id);
```

Detaches the UI controller with the specified identifier.

Called when a UI element is removed to prevent memory leaks.

### getController

```dart
UIElementController? getController(String id);
```

Returns the [UIElementController](/docs/api/dart_api/UIElementController) associated with the specified identifier, or `null`.

### updateAttributes

```dart
Future<void> updateAttributes(
  String controllerId,
  Map<String, dynamic> json,
);
```

Updates attributes of the UI controller with the specified identifier.

**Parameters:**
- `controllerId` — controller identifier
- `json` — key-value map with attributes to update

### controllersCount

```dart
int get controllersCount;
```

Returns the number of controllers attached to the delegate.

Useful for diagnostics and debugging.

### releaseResources

```dart
void releaseResources();
```

Releases delegate resources.

## Typical Responsibilities

- Mapping controller identifiers to their active instances
- Dynamically attaching/detaching controllers when building or disposing UI
- Applying state and attribute updates from the server
- Providing methods for querying or enumerating attached controllers

## Implementation Example

```dart
final class MyControllerManager with UIControllerCapabilityDelegate {
  final _controllers = <String, UIElementController>{};

  @override
  void attachController(String id, UIElementController controller) {
    _controllers[id] = controller;
  }

  @override
  void detachController(String id) {
    _controllers.remove(id)?.dispose();
  }

  @override
  UIElementController? getController(String id) => _controllers[id];

  @override
  Future<void> updateAttributes(
    String controllerId,
    Map<String, dynamic> json,
  ) async {
    _controllers[controllerId]?.updateState(json);
  }

  @override
  int get controllersCount => _controllers.length;

  @override
  void releaseResources() {
    for (final controller in _controllers.values) {
      controller.dispose();
    }
    _controllers.clear();
  }
}
```

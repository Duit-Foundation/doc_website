# FocusCapabilityDelegate

A mixin that provides an interface for managing focus of UI elements in the Duit system.

Classes using this delegate must implement methods for working with `FocusNode` — requesting focus, navigating between elements, and managing focus state.

## Methods

### requestFocus

```dart
void requestFocus(String nodeId);
```

Requests that focus be moved to the `FocusNode` associated with the specified `nodeId`.

### nextFocus

```dart
bool nextFocus(String nodeId);
```

Moves focus to the next focusable node in traversal order.

**Returns:** `true` if focus was successfully moved.

### previousFocus

```dart
bool previousFocus(String nodeId);
```

Moves focus to the previous focusable node.

**Returns:** `true` if focus was successfully moved.

### unfocus

```dart
void unfocus(
  String nodeId, {
  UnfocusDisposition disposition = UnfocusDisposition.scope,
});
```

Removes focus from the specified node.

**Parameters:**
- `nodeId` — node identifier
- `disposition` — how to handle focus when unfocusing

### focusInDirection

```dart
bool focusInDirection(String nodeId, TraversalDirection direction);
```

Moves focus in the specified direction (up, down, left, right).

### attachFocusNode

```dart
void attachFocusNode(String nodeId, FocusNode node);
```

Attaches a `FocusNode` to the delegate with the specified identifier.

### detachFocusNode

```dart
void detachFocusNode(String nodeId);
```

Detaches the `FocusNode` with the specified identifier.

### getNode

```dart
FocusNode? getNode(Object? key);
```

Returns the `FocusNode` associated with the specified key.

### releaseResources

```dart
void releaseResources();
```

Releases delegate resources.

## Usage Example

```dart
final class MyFocusManager with FocusCapabilityDelegate {
  final _nodes = <String, FocusNode>{};

  @override
  void attachFocusNode(String nodeId, FocusNode node) {
    _nodes[nodeId] = node;
  }

  @override
  void detachFocusNode(String nodeId) {
    _nodes.remove(nodeId);
  }

  @override
  void requestFocus(String nodeId) {
    _nodes[nodeId]?.requestFocus();
  }

  @override
  FocusNode? getNode(Object? key) => _nodes[key];

  // ... other methods
}
```

:::tip
Focus management is especially important for ensuring accessibility and supporting keyboard navigation in applications.
:::

## See Also

- [Flutter Focus cookbook](https://docs.flutter.dev/cookbook/forms/focus)
- [FocusNode API](https://api.flutter.dev/flutter/widgets/FocusNode-class.html)

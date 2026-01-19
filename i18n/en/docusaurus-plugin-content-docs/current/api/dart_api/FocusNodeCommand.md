# FocusNodeCommand

A group of commands for managing focus of UI elements. All commands extend from the base class `GenericFocusNodeCommand`, which in turn extends [RemoteCommand](./RemoteCommand.md).

## Supported Actions

| Action | Class | Description |
|--------|-------|-------------|
| `requestFocus` | `FocusNodeRequestFocusCommand` | Request focus for an element |
| `unfocus` | `FocusNodeUnfocusCommand` | Remove focus from an element |
| `nextFocus` | `FocusNodeNextFocusCommand` | Move focus to the next element |
| `previousFocus` | `FocusNodePreviousFocusCommand` | Move focus to the previous element |
| `focusInDirection` | `FocusNodeFocusInDirectionCommand` | Move focus in a specified direction |

## JSON Examples

### Request Focus

```json
{
  "type": "command",
  "controllerId": "text_field_id",
  "commandData": {
    "type": "focusNode",
    "action": "requestFocus"
  }
}
```

### Request Focus for Specific Node

```json
{
  "type": "command",
  "controllerId": "focus_scope_id",
  "commandData": {
    "type": "focusNode",
    "action": "requestFocus",
    "nodeId": "specific_node_id"
  }
}
```

### Unfocus

```json
{
  "type": "command",
  "controllerId": "text_field_id",
  "commandData": {
    "type": "focusNode",
    "action": "unfocus",
    "disposition": "scope"
  }
}
```

Available `disposition` values:
- `scope` - unfocus within the current scope
- `previouslyFocusedChild` - return focus to the previously focused child

### Move to Next Focusable Element

```json
{
  "type": "command",
  "controllerId": "focus_scope_id",
  "commandData": {
    "type": "focusNode",
    "action": "nextFocus"
  }
}
```

### Move to Previous Focusable Element

```json
{
  "type": "command",
  "controllerId": "focus_scope_id",
  "commandData": {
    "type": "focusNode",
    "action": "previousFocus"
  }
}
```

### Move Focus in Direction

```json
{
  "type": "command",
  "controllerId": "focus_scope_id",
  "commandData": {
    "type": "focusNode",
    "action": "focusInDirection",
    "direction": "down"
  }
}
```

Available directions (`TraversalDirection`):
- `up` - upward
- `down` - downward
- `left` - to the left
- `right` - to the right

## Command Classes

### FocusNodeRequestFocusCommand

```dart
final class FocusNodeRequestFocusCommand extends GenericFocusNodeCommand {
  final String? nodeId;
  
  const FocusNodeRequestFocusCommand({
    required super.controllerId,
    this.nodeId,
    ...
  });
}
```

### FocusNodeUnfocusCommand

```dart
final class FocusNodeUnfocusCommand extends GenericFocusNodeCommand {
  final UnfocusDisposition disposition;
  
  const FocusNodeUnfocusCommand({
    required super.controllerId,
    required this.disposition,
    ...
  });
}
```

### FocusNodeNextFocusCommand

```dart
final class FocusNodeNextFocusCommand extends GenericFocusNodeCommand {
  const FocusNodeNextFocusCommand({
    required super.controllerId,
    ...
  });
}
```

### FocusNodePreviousFocusCommand

```dart
final class FocusNodePreviousFocusCommand extends GenericFocusNodeCommand {
  const FocusNodePreviousFocusCommand({
    required super.controllerId,
    ...
  });
}
```

### FocusNodeFocusInDirectionCommand

```dart
final class FocusNodeFocusInDirectionCommand extends GenericFocusNodeCommand {
  final TraversalDirection direction;
  
  const FocusNodeFocusInDirectionCommand({
    required super.controllerId,
    required this.direction,
    ...
  });
}
```

## Related Types

- [RemoteCommand](./RemoteCommand.md) - base command class

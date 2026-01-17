# BottomSheetCommand

The class represents a command for showing or hiding a modal bottom sheet. Extends [RemoteCommand](./RemoteCommand.md).

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `action` | `OverlayAction` | Action (`open` or `close`) |
| `content` | `Map<String, dynamic>` | BottomSheet content (widget tree) |
| `isScrollControlled` | `bool` | Content scroll control |
| `isDismissible` | `bool` | Can be dismissed by tapping outside (default `true`) |
| `useSafeArea` | `bool` | Use safe area |
| `useRootNavigator` | `bool` | Use root navigator |
| `enableDrag` | `bool` | Allow dragging (default `true`) |
| `showDragHandle` | `bool?` | Show drag handle |
| `scrollControlDisabledMaxHeightRatio` | `double` | Maximum height ratio |
| `backgroundColor` | `Color?` | Background color |
| `barrierColor` | `Color?` | Barrier color |
| `shape` | `ShapeBorder?` | Border shape |
| `clipBehavior` | `Clip?` | Clip behavior |
| `constraints` | `BoxConstraints?` | Size constraints |
| `anchorPoint` | `Offset?` | Anchor point |
| `onClose` | `ServerAction?` | Action on close |

## Class Definition

```dart
final class BottomSheetCommand extends RemoteCommand {
  final OverlayAction action;
  final Map<String, dynamic> content;
  final bool isScrollControlled;
  final bool isDismissible;
  final bool useSafeArea;
  final bool useRootNavigator;
  final bool enableDrag;
  final bool? showDragHandle;
  final double scrollControlDisabledMaxHeightRatio;
  final Color? backgroundColor;
  final Color? barrierColor;
  final ShapeBorder? shape;
  final Clip? clipBehavior;
  final BoxConstraints? constraints;
  final Offset? anchorPoint;
  final ServerAction? onClose;

  const BottomSheetCommand({...});

  factory BottomSheetCommand.fromRemoteCommand(RemoteCommand command);
}
```

## OverlayAction

```dart
enum OverlayAction {
  open,   // Open modal window
  close,  // Close modal window
}
```

## JSON Examples

### Opening BottomSheet

```json
{
  "type": "command",
  "controllerId": "overlay",
  "commandData": {
    "type": "bottomSheet",
    "action": "open",
    "content": {
      "type": "Container",
      "attributes": {
        "padding": {"top": 16, "bottom": 16, "left": 16, "right": 16}
      },
      "child": {
        "type": "Text",
        "attributes": {
          "data": "Hello from BottomSheet!"
        }
      }
    },
    "isScrollControlled": true,
    "isDismissible": true,
    "enableDrag": true,
    "showDragHandle": true,
    "backgroundColor": "#FFFFFF"
  }
}
```

### Closing BottomSheet

```json
{
  "type": "command",
  "controllerId": "overlay",
  "commandData": {
    "type": "bottomSheet",
    "action": "close"
  }
}
```

### With Close Handler

```json
{
  "type": "command",
  "controllerId": "overlay",
  "commandData": {
    "type": "bottomSheet",
    "action": "open",
    "content": {...},
    "onClose": {
      "executionType": 0,
      "event": "/on-sheet-closed"
    }
  }
}
```

## Related Types

- [RemoteCommand](./RemoteCommand.md) - base command class
- [DialogCommand](./DialogCommand.md) - dialog window command

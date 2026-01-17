# DialogCommand

The class represents a command for showing or hiding a dialog window. Extends [RemoteCommand](./RemoteCommand.md).

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `action` | `OverlayAction` | Action (`open` or `close`) |
| `content` | `Map<String, dynamic>` | Dialog content (widget tree) |
| `barrierDismissible` | `bool` | Can be dismissed by tapping outside (default `true`) |
| `useSafeArea` | `bool` | Use safe area (default `true`) |
| `useRootNavigator` | `bool` | Use root navigator (default `true`) |
| `barrierColor` | `Color?` | Barrier color |
| `barrierLabel` | `String?` | Barrier label for accessibility |
| `anchorPoint` | `Offset?` | Anchor point |
| `onClose` | `ServerAction?` | Action on close |

## Class Definition

```dart
final class DialogCommand extends RemoteCommand {
  final OverlayAction action;
  final Map<String, dynamic> content;
  final bool barrierDismissible;
  final bool useSafeArea;
  final bool useRootNavigator;
  final Color? barrierColor;
  final String? barrierLabel;
  final Offset? anchorPoint;
  final ServerAction? onClose;

  const DialogCommand({...});

  factory DialogCommand.fromRemoteCommand(RemoteCommand command);
}
```

## OverlayAction

```dart
enum OverlayAction {
  open,   // Open dialog window
  close,  // Close dialog window
}
```

## JSON Examples

### Opening Dialog

```json
{
  "type": "command",
  "controllerId": "overlay",
  "commandData": {
    "type": "dialog",
    "action": "open",
    "content": {
      "type": "AlertDialog",
      "attributes": {
        "title": "Confirmation",
        "content": "Are you sure you want to continue?"
      }
    },
    "barrierDismissible": true,
    "useSafeArea": true,
    "barrierColor": "#80000000"
  }
}
```

### Closing Dialog

```json
{
  "type": "command",
  "controllerId": "overlay",
  "commandData": {
    "type": "dialog",
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
    "type": "dialog",
    "action": "open",
    "content": {...},
    "barrierDismissible": false,
    "onClose": {
      "executionType": 0,
      "event": "/on-dialog-closed"
    }
  }
}
```

## Related Types

- [RemoteCommand](./RemoteCommand.md) - base command class
- [BottomSheetCommand](./BottomSheetCommand.md) - modal bottom sheet command

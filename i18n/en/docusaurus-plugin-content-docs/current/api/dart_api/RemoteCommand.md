# RemoteCommand

Base class representing a command sent to control actions of a controller. The command defines the action type and contains data for its execution.

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `controllerId` | `String` | Identifier of the controller that the command is addressed to |
| `type` | `String` | Command type (`animation`, `bottomSheet`, `dialog`, `pageView`, `focusNode`) |
| `commandData` | `Map<String, dynamic>` | Command-specific data |

## Class Definition

```dart
base class RemoteCommand {
  final String controllerId;
  final String type;
  final Map<String, dynamic> commandData;

  const RemoteCommand({
    required this.controllerId,
    required this.type,
    required this.commandData,
  });
}
```

## Supported Command Types

| Type | Class | Description |
|------|-------|-------------|
| `animation` | [AnimationCommand](./AnimationCommand.md) | Property animation control |
| `bottomSheet` | [BottomSheetCommand](./BottomSheetCommand.md) | Show/hide modal bottom sheets |
| `dialog` | [DialogCommand](./DialogCommand.md) | Show/hide dialog windows |
| `pageView` | [PageViewCommand](./PageViewCommand.md) | PageView/PageController management |
| `focusNode` | [FocusNodeCommand](./FocusNodeCommand.md) | Focus management for elements |

## JSON Example

```json
{
  "type": "command",
  "controllerId": "widget_id",
  "commandData": {
    "type": "animation",
    "animatedPropKey": "style",
    "method": 0,
    "trigger": "onAction"
  }
}
```

## Usage

Commands are sent via CommandEvent and processed by widget controllers. Each command type has its specialized implementation that extends `RemoteCommand`.

```dart
// Example of listening to commands in a controller
controller.listenCommand((command) async {
  switch (command) {
    case AnimationCommand(:final method, :final animatedPropKey):
      // Handle animation command
      break;
    case BottomSheetCommand(:final action, :final content):
      // Handle bottom sheet command
      break;
    // ...
  }
});
```

## Related Types

- [UIElementController](./UIElementController.md) - element controller that receives commands
- [CommandEvent](/docs/core_concepts/actions_events#commandevent) - event containing the command

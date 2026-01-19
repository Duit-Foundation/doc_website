# AnimationCommand

The class represents a command for controlling animation of a corresponding property. Extends [RemoteCommand](./RemoteCommand.md).

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `controllerId` | `String` | Identifier of the controlled `AnimatedBuilder` widget |
| `animatedPropKey` | `String` | Animation controller identifier |
| `method` | `AnimationMethod` | Animation method to be called |
| `trigger` | `AnimationTrigger` | Trigger that determines when the animation should start |
| `commandData` | `Map<String, dynamic>` | Command data |
| `type` | `String` | Command type (always `"animation"`) |

## Class Definition

```dart
final class AnimationCommand extends RemoteCommand {
  final String animatedPropKey;
  final AnimationMethod method;
  final AnimationTrigger trigger;

  const AnimationCommand({
    required super.commandData,
    required super.controllerId,
    required super.type,
    required this.animatedPropKey,
    required this.method,
    required this.trigger,
  });

  factory AnimationCommand.fromRemoteCommand(RemoteCommand command);
}
```

## JSON Example

```json
{
  "type": "command",
  "controllerId": "animated_widget_id",
  "commandData": {
    "type": "animation",
    "animatedPropKey": "style",
    "method": 0,
    "trigger": "onAction"
  }
}
```

## Related Types

- [AnimationMethod](./AnimationMethod.md) - animation method enumeration (`forward`, `repeat`, `reverse`, `toggle`)
- [AnimationTrigger](./AnimationTrigger.md) - animation trigger enumeration (`onEnter`, `onAction`)
- [RemoteCommand](./RemoteCommand.md) - base command class

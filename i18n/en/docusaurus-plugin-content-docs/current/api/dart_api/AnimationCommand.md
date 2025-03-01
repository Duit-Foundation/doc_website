# AnimationCommand

The class represents a command to initiate an animation for a corresponding property. Where `controllerId` is the identifier of the controlled widget `AnimatedBuilder`, and `animatedPropKey` serves as the animation controller identifier.

```dart
final class AnimationCommand {
  final String controllerId;
  final AnimationMethod method;
  final String animatedPropKey;

  AnimationCommand({
    required this.controllerId,
    required this.method,
    required this.animatedPropKey,
  });
}
```
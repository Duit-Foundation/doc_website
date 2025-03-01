# AnimationInterval

A class representing the time interval for an animation. Used when associating multiple `Tween`s with a single animation controller.

```dart
final class AnimationInterval {
  final double begin, end;

  const AnimationInterval(
    this.begin,
    this.end,
  );
}
```

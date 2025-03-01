# AnimationMethod

The enum defines the animation launch method. Mirrors `AnimationController` methods (forward, repeat, reverse). The additional `toggle` method allows calling animation methods based on the current state. For example, if the animation has finished, the `reverse` method will be invoked.

```dart
enum AnimationMethod {
  forward,
  repeat,
  reverse,
  /// Toggle between forward and reverse
  toggle,
}
```

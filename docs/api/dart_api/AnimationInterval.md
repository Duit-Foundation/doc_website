# AnimationInterval

Класс, описывающий интервал времени выполнения анимации. Используется при связывании нескольких `Tween` с одним контроллером анимации.

```dart
final class AnimationInterval {
  final double begin, end;

  const AnimationInterval(
    this.begin,
    this.end,
  );
}
```
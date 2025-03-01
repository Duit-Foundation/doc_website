# AnimationMethod

Enum определяет метод запуска анимации. Повторяет методы `AnimationController` (forward, repeat, reverse). Дополнительный метод `toggle` позволяет вызывать методы анимации в зависимости от текущего состояния. Например, если анимация завершилась, будет вызван метод `reverse`.

```dart
enum AnimationMethod {
  forward,
  repeat,
  reverse,
  /// Toggle between forward and reverse
  toggle,
}
```
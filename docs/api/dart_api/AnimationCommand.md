# AnimationCommand

Класс представляет команду для запуска анимации соотвествющего свойства. Где `controllerId` - идентификатор контроллируемого виджета `AnimatedBuilder`, а `animatedPropKey` выступает в роли идентификатора контроллера анимации.

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
# AnimationCommand

Класс представляет команду для управления анимацией соответствующего свойства. Наследуется от [RemoteCommand](./RemoteCommand.md).

## Свойства

| Свойство | Тип | Описание |
|----------|-----|----------|
| `controllerId` | `String` | Идентификатор контроллируемого виджета `AnimatedBuilder` |
| `animatedPropKey` | `String` | Идентификатор контроллера анимации |
| `method` | `AnimationMethod` | Метод анимации, который будет вызван |
| `trigger` | `AnimationTrigger` | Триггер, определяющий когда анимация должна быть запущена |
| `commandData` | `Map<String, dynamic>` | Данные команды |
| `type` | `String` | Тип команды (всегда `"animation"`) |

## Определение класса

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

## Пример JSON

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

## Связанные типы

- [AnimationMethod](./AnimationMethod.md) - перечисление методов анимации (`forward`, `repeat`, `reverse`, `toggle`)
- [AnimationTrigger](./AnimationTrigger.md) - перечисление триггеров анимации (`onEnter`, `onAction`)
- [RemoteCommand](./RemoteCommand.md) - базовый класс команды

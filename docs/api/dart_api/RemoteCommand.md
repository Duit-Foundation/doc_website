# RemoteCommand

Базовый класс, представляющий команду, которая отправляется для управления действиями контроллера. Команда определяет тип действия и содержит данные для его выполнения.

## Свойства

| Свойство | Тип | Описание |
|----------|-----|----------|
| `controllerId` | `String` | Идентификатор контроллера, которому адресована команда |
| `type` | `String` | Тип команды (`animation`, `bottomSheet`, `dialog`, `pageView`, `focusNode`) |
| `commandData` | `Map<String, dynamic>` | Данные команды, специфичные для её типа |

## Определение класса

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

## Поддерживаемые типы команд

| Тип | Класс | Описание |
|-----|-------|----------|
| `animation` | [AnimationCommand](./AnimationCommand.md) | Управление анимацией свойств |
| `bottomSheet` | [BottomSheetCommand](./BottomSheetCommand.md) | Показ/скрытие модальных окон |
| `dialog` | [DialogCommand](./DialogCommand.md) | Показ/скрытие диалоговых окон |
| `pageView` | [PageViewCommand](./PageViewCommand.md) | Управление PageView/PageController |
| `focusNode` | [FocusNodeCommand](./FocusNodeCommand.md) | Управление фокусом элементов |

## Пример JSON

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

## Использование

Команды отправляются через [CommandEvent](/docs/core_concepts/actions_events.md#commandevent) и обрабатываются контроллерами виджетов. Каждый тип команды имеет свою специализированную реализацию, которая наследуется от `RemoteCommand`.

```dart
// Пример прослушивания команд в контроллере
controller.listenCommand((command) async {
  switch (command) {
    case AnimationCommand(:final method, :final animatedPropKey):
      // Обработка команды анимации
      break;
    case BottomSheetCommand(:final action, :final content):
      // Обработка команды bottom sheet
      break;
    // ...
  }
});
```

## Связанные типы

- [UIElementController](./UIElementController.md) - контроллер элемента, принимающий команды
- [CommandEvent](/docs/core_concepts/actions_events#commandevent) - событие, содержащее команду

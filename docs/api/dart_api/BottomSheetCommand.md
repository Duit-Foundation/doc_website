# BottomSheetCommand

Класс представляет команду для показа или скрытия модального окна (BottomSheet). Наследуется от [RemoteCommand](./RemoteCommand.md).

## Свойства

| Свойство | Тип | Описание |
|----------|-----|----------|
| `action` | `OverlayAction` | Действие (`open` или `close`) |
| `content` | `Map<String, dynamic>` | Содержимое BottomSheet (дерево виджетов) |
| `isScrollControlled` | `bool` | Управление прокруткой содержимого |
| `isDismissible` | `bool` | Можно ли закрыть касанием за пределами (по умолчанию `true`) |
| `useSafeArea` | `bool` | Использовать безопасную область |
| `useRootNavigator` | `bool` | Использовать корневой навигатор |
| `enableDrag` | `bool` | Разрешить перетаскивание (по умолчанию `true`) |
| `showDragHandle` | `bool?` | Показывать ручку для перетаскивания |
| `scrollControlDisabledMaxHeightRatio` | `double` | Максимальное соотношение высоты |
| `backgroundColor` | `Color?` | Цвет фона |
| `barrierColor` | `Color?` | Цвет барьера |
| `shape` | `ShapeBorder?` | Форма границы |
| `clipBehavior` | `Clip?` | Поведение обрезки |
| `constraints` | `BoxConstraints?` | Ограничения размера |
| `anchorPoint` | `Offset?` | Точка привязки |
| `onClose` | `ServerAction?` | Действие при закрытии |

## Определение класса

```dart
final class BottomSheetCommand extends RemoteCommand {
  final OverlayAction action;
  final Map<String, dynamic> content;
  final bool isScrollControlled;
  final bool isDismissible;
  final bool useSafeArea;
  final bool useRootNavigator;
  final bool enableDrag;
  final bool? showDragHandle;
  final double scrollControlDisabledMaxHeightRatio;
  final Color? backgroundColor;
  final Color? barrierColor;
  final ShapeBorder? shape;
  final Clip? clipBehavior;
  final BoxConstraints? constraints;
  final Offset? anchorPoint;
  final ServerAction? onClose;

  const BottomSheetCommand({...});

  factory BottomSheetCommand.fromRemoteCommand(RemoteCommand command);
}
```

## OverlayAction

```dart
enum OverlayAction {
  open,   // Открыть модальное окно
  close,  // Закрыть модальное окно
}
```

## Пример JSON

### Открытие BottomSheet

```json
{
  "type": "command",
  "controllerId": "overlay",
  "commandData": {
    "type": "bottomSheet",
    "action": "open",
    "content": {
      "type": "Container",
      "attributes": {
        "padding": {"top": 16, "bottom": 16, "left": 16, "right": 16}
      },
      "child": {
        "type": "Text",
        "attributes": {
          "data": "Hello from BottomSheet!"
        }
      }
    },
    "isScrollControlled": true,
    "isDismissible": true,
    "enableDrag": true,
    "showDragHandle": true,
    "backgroundColor": "#FFFFFF"
  }
}
```

### Закрытие BottomSheet

```json
{
  "type": "command",
  "controllerId": "overlay",
  "commandData": {
    "type": "bottomSheet",
    "action": "close"
  }
}
```

### С обработчиком закрытия

```json
{
  "type": "command",
  "controllerId": "overlay",
  "commandData": {
    "type": "bottomSheet",
    "action": "open",
    "content": {...},
    "onClose": {
      "executionType": 0,
      "event": "/on-sheet-closed"
    }
  }
}
```

## Связанные типы

- [RemoteCommand](./RemoteCommand.md) - базовый класс команды
- [DialogCommand](./DialogCommand.md) - команда для диалоговых окон

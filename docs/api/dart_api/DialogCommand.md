# DialogCommand

Класс представляет команду для показа или скрытия диалогового окна. Наследуется от [RemoteCommand](./RemoteCommand.md).

## Свойства

| Свойство | Тип | Описание |
|----------|-----|----------|
| `action` | `OverlayAction` | Действие (`open` или `close`) |
| `content` | `Map<String, dynamic>` | Содержимое диалога (дерево виджетов) |
| `barrierDismissible` | `bool` | Можно ли закрыть касанием за пределами (по умолчанию `true`) |
| `useSafeArea` | `bool` | Использовать безопасную область (по умолчанию `true`) |
| `useRootNavigator` | `bool` | Использовать корневой навигатор (по умолчанию `true`) |
| `barrierColor` | `Color?` | Цвет барьера |
| `barrierLabel` | `String?` | Метка барьера для доступности |
| `anchorPoint` | `Offset?` | Точка привязки |
| `onClose` | `ServerAction?` | Действие при закрытии |

## Определение класса

```dart
final class DialogCommand extends RemoteCommand {
  final OverlayAction action;
  final Map<String, dynamic> content;
  final bool barrierDismissible;
  final bool useSafeArea;
  final bool useRootNavigator;
  final Color? barrierColor;
  final String? barrierLabel;
  final Offset? anchorPoint;
  final ServerAction? onClose;

  const DialogCommand({...});

  factory DialogCommand.fromRemoteCommand(RemoteCommand command);
}
```

## OverlayAction

```dart
enum OverlayAction {
  open,   // Открыть диалоговое окно
  close,  // Закрыть диалоговое окно
}
```

## Пример JSON

### Открытие диалога

```json
{
  "type": "command",
  "controllerId": "overlay",
  "commandData": {
    "type": "dialog",
    "action": "open",
    "content": {
      "type": "AlertDialog",
      "attributes": {
        "title": "Подтверждение",
        "content": "Вы уверены, что хотите продолжить?"
      }
    },
    "barrierDismissible": true,
    "useSafeArea": true,
    "barrierColor": "#80000000"
  }
}
```

### Закрытие диалога

```json
{
  "type": "command",
  "controllerId": "overlay",
  "commandData": {
    "type": "dialog",
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
    "type": "dialog",
    "action": "open",
    "content": {...},
    "barrierDismissible": false,
    "onClose": {
      "executionType": 0,
      "event": "/on-dialog-closed"
    }
  }
}
```

## Связанные типы

- [RemoteCommand](./RemoteCommand.md) - базовый класс команды
- [BottomSheetCommand](./BottomSheetCommand.md) - команда для модальных окон

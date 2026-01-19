# FocusNodeCommand

Группа команд для управления фокусом элементов интерфейса. Все команды наследуются от базового класса `GenericFocusNodeCommand`, который в свою очередь наследуется от [RemoteCommand](./RemoteCommand.md).

## Поддерживаемые действия

| Действие | Класс | Описание |
|----------|-------|----------|
| `requestFocus` | `FocusNodeRequestFocusCommand` | Запросить фокус для элемента |
| `unfocus` | `FocusNodeUnfocusCommand` | Снять фокус с элемента |
| `nextFocus` | `FocusNodeNextFocusCommand` | Переместить фокус на следующий элемент |
| `previousFocus` | `FocusNodePreviousFocusCommand` | Переместить фокус на предыдущий элемент |
| `focusInDirection` | `FocusNodeFocusInDirectionCommand` | Переместить фокус в указанном направлении |

## Примеры JSON

### Запрос фокуса

```json
{
  "type": "command",
  "controllerId": "text_field_id",
  "commandData": {
    "type": "focusNode",
    "action": "requestFocus"
  }
}
```

### Запрос фокуса для конкретного узла

```json
{
  "type": "command",
  "controllerId": "focus_scope_id",
  "commandData": {
    "type": "focusNode",
    "action": "requestFocus",
    "nodeId": "specific_node_id"
  }
}
```

### Снятие фокуса

```json
{
  "type": "command",
  "controllerId": "text_field_id",
  "commandData": {
    "type": "focusNode",
    "action": "unfocus",
    "disposition": "scope"
  }
}
```

Доступные значения `disposition`:
- `scope` - снять фокус в пределах текущей области
- `previouslyFocusedChild` - вернуть фокус предыдущему дочернему элементу

### Переход к следующему фокусируемому элементу

```json
{
  "type": "command",
  "controllerId": "focus_scope_id",
  "commandData": {
    "type": "focusNode",
    "action": "nextFocus"
  }
}
```

### Переход к предыдущему фокусируемому элементу

```json
{
  "type": "command",
  "controllerId": "focus_scope_id",
  "commandData": {
    "type": "focusNode",
    "action": "previousFocus"
  }
}
```

### Перемещение фокуса в направлении

```json
{
  "type": "command",
  "controllerId": "focus_scope_id",
  "commandData": {
    "type": "focusNode",
    "action": "focusInDirection",
    "direction": "down"
  }
}
```

Доступные направления (`TraversalDirection`):
- `up` - вверх
- `down` - вниз
- `left` - влево
- `right` - вправо

## Классы команд

### FocusNodeRequestFocusCommand

```dart
final class FocusNodeRequestFocusCommand extends GenericFocusNodeCommand {
  final String? nodeId;
  
  const FocusNodeRequestFocusCommand({
    required super.controllerId,
    this.nodeId,
    ...
  });
}
```

### FocusNodeUnfocusCommand

```dart
final class FocusNodeUnfocusCommand extends GenericFocusNodeCommand {
  final UnfocusDisposition disposition;
  
  const FocusNodeUnfocusCommand({
    required super.controllerId,
    required this.disposition,
    ...
  });
}
```

### FocusNodeNextFocusCommand

```dart
final class FocusNodeNextFocusCommand extends GenericFocusNodeCommand {
  const FocusNodeNextFocusCommand({
    required super.controllerId,
    ...
  });
}
```

### FocusNodePreviousFocusCommand

```dart
final class FocusNodePreviousFocusCommand extends GenericFocusNodeCommand {
  const FocusNodePreviousFocusCommand({
    required super.controllerId,
    ...
  });
}
```

### FocusNodeFocusInDirectionCommand

```dart
final class FocusNodeFocusInDirectionCommand extends GenericFocusNodeCommand {
  final TraversalDirection direction;
  
  const FocusNodeFocusInDirectionCommand({
    required super.controllerId,
    required this.direction,
    ...
  });
}
```

## Связанные типы

- [RemoteCommand](./RemoteCommand.md) - базовый класс команды

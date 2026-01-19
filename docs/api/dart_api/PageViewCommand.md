# PageViewCommand

Группа команд для управления виджетом `PageView` и его `PageController`. Все команды наследуются от базового класса `_PageViewCommand`, который в свою очередь наследуется от [RemoteCommand](./RemoteCommand.md).

## Поддерживаемые действия

| Действие | Класс | Описание |
|----------|-------|----------|
| `nextPage` | `PageViewNextPageCommand` | Переход к следующей странице |
| `previousPage` | `PageViewPreviousPageCommand` | Переход к предыдущей странице |
| `animateTo` | `PageViewAnimateToCommand` | Анимированный переход к указанному смещению |
| `animateToPage` | `PageViewAnimateToPageCommand` | Анимированный переход к указанной странице |
| `jumpTo` | `PageViewJumpToCommand` | Мгновенный переход к указанному смещению |
| `jumpToPage` | `PageViewJumpToPageCommand` | Мгновенный переход к указанной странице |

## Анимированные команды

Команды `nextPage`, `previousPage`, `animateTo` и `animateToPage` поддерживают параметры анимации:

| Свойство | Тип | Описание |
|----------|-----|----------|
| `duration` | `int` | Длительность анимации в миллисекундах |
| `curve` | `String` | Кривая анимации (по умолчанию `linear`) |

### Доступные кривые анимации

`linear`, `ease`, `easeIn`, `easeOut`, `easeInOut`, `bounceIn`, `bounceOut`, `bounceInOut`, `elasticIn`, `elasticOut`, `elasticInOut` и другие стандартные Flutter кривые.

## Примеры JSON

### Переход к следующей странице

```json
{
  "type": "command",
  "controllerId": "page_view_id",
  "commandData": {
    "type": "pageView",
    "action": "nextPage",
    "duration": 300,
    "curve": "easeInOut"
  }
}
```

### Переход к предыдущей странице

```json
{
  "type": "command",
  "controllerId": "page_view_id",
  "commandData": {
    "type": "pageView",
    "action": "previousPage",
    "duration": 300,
    "curve": "easeInOut"
  }
}
```

### Анимированный переход к странице

```json
{
  "type": "command",
  "controllerId": "page_view_id",
  "commandData": {
    "type": "pageView",
    "action": "animateToPage",
    "page": 3,
    "duration": 500,
    "curve": "bounceOut"
  }
}
```

### Анимированный переход к смещению

```json
{
  "type": "command",
  "controllerId": "page_view_id",
  "commandData": {
    "type": "pageView",
    "action": "animateTo",
    "offset": 150.0,
    "duration": 300,
    "curve": "ease"
  }
}
```

### Мгновенный переход к странице

```json
{
  "type": "command",
  "controllerId": "page_view_id",
  "commandData": {
    "type": "pageView",
    "action": "jumpToPage",
    "page": 2
  }
}
```

### Мгновенный переход к смещению

```json
{
  "type": "command",
  "controllerId": "page_view_id",
  "commandData": {
    "type": "pageView",
    "action": "jumpTo",
    "value": 100.0
  }
}
```

## Классы команд

### PageViewNextPageCommand

```dart
final class PageViewNextPageCommand extends _PageViewAnimatedCommand {
  const PageViewNextPageCommand({
    required super.duration,
    required super.curve,
    ...
  });
}
```

### PageViewPreviousPageCommand

```dart
final class PageViewPreviousPageCommand extends _PageViewAnimatedCommand {
  const PageViewPreviousPageCommand({
    required super.duration,
    required super.curve,
    ...
  });
}
```

### PageViewAnimateToPageCommand

```dart
final class PageViewAnimateToPageCommand extends _PageViewAnimatedCommand {
  final int page;
  
  const PageViewAnimateToPageCommand({
    required this.page,
    required super.duration,
    required super.curve,
    ...
  });
}
```

### PageViewAnimateToCommand

```dart
final class PageViewAnimateToCommand extends _PageViewAnimatedCommand {
  final double offset;
  
  const PageViewAnimateToCommand({
    required this.offset,
    required super.duration,
    required super.curve,
    ...
  });
}
```

### PageViewJumpToPageCommand

```dart
final class PageViewJumpToPageCommand extends _PageViewCommand {
  final int page;
  
  const PageViewJumpToPageCommand({
    required this.page,
    ...
  });
}
```

### PageViewJumpToCommand

```dart
final class PageViewJumpToCommand extends _PageViewCommand {
  final double value;
  
  const PageViewJumpToCommand({
    required this.value,
    ...
  });
}
```

## Связанные типы

- [RemoteCommand](./RemoteCommand.md) - базовый класс команды

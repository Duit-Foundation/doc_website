# PageViewCommand

A group of commands for controlling the `PageView` widget and its `PageController`. All commands extend from the base class `_PageViewCommand`, which in turn extends [RemoteCommand](./RemoteCommand.md).

## Supported Actions

| Action | Class | Description |
|--------|-------|-------------|
| `nextPage` | `PageViewNextPageCommand` | Navigate to the next page |
| `previousPage` | `PageViewPreviousPageCommand` | Navigate to the previous page |
| `animateTo` | `PageViewAnimateToCommand` | Animated scroll to a specified offset |
| `animateToPage` | `PageViewAnimateToPageCommand` | Animated navigation to a specified page |
| `jumpTo` | `PageViewJumpToCommand` | Instant scroll to a specified offset |
| `jumpToPage` | `PageViewJumpToPageCommand` | Instant navigation to a specified page |

## Animated Commands

Commands `nextPage`, `previousPage`, `animateTo`, and `animateToPage` support animation parameters:

| Property | Type | Description |
|----------|------|-------------|
| `duration` | `int` | Animation duration in milliseconds |
| `curve` | `String` | Animation curve (default `linear`) |

### Available Animation Curves

`linear`, `ease`, `easeIn`, `easeOut`, `easeInOut`, `bounceIn`, `bounceOut`, `bounceInOut`, `elasticIn`, `elasticOut`, `elasticInOut`, and other standard Flutter curves.

## JSON Examples

### Navigate to Next Page

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

### Navigate to Previous Page

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

### Animate to Page

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

### Animate to Offset

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

### Jump to Page

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

### Jump to Offset

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

## Command Classes

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

## Related Types

- [RemoteCommand](./RemoteCommand.md) - base command class

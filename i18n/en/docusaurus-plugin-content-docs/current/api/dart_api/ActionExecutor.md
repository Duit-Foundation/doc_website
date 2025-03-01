# ActionExecutor

The interface for implementing a class responsible for executing actions. Use this interface to create custom implementations of `ActionExecutor`.

```dart
abstract class ActionExecutor {
  final UIDriver driver;
  final DebugLogger? logger;

  ActionExecutor({
    required this.driver,
    this.logger,
  });

  Future<ServerEvent?> executeAction(
    ServerAction action,
  );
}
```

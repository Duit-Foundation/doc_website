# ActionExecutor

:::danger Deprecated
The `ActionExecutor` class is marked as deprecated and will be removed in the next major release.

Use [ServerActionExecutionCapabilityDelegate](/docs/api/dart_api/ServerActionExecutionCapabilityDelegate) instead.
:::

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

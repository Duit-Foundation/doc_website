# ActionExecutor

:::danger Deprecated
Класс `ActionExecutor` помечен как deprecated и будет удален в следующем мажорном релизе.

Используйте [ServerActionExecutionCapabilityDelegate](/docs/api/dart_api/ServerActionExecutionCapabilityDelegate) вместо него.
:::

Интерфейс для реализации класса, отвечающего за выполнение действий. Используйте этот интерфейс для создания собственных реализаций `ActionExecutor`.

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
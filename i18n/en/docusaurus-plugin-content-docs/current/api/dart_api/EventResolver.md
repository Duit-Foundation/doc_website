# EventResolver

:::danger Deprecated
The `EventResolver` class is marked as deprecated and will be removed in the next major release.
:::

An abstract class representing a handler for basic events. This class is responsible for processing server events and passing execution flow to [UIDriver](/docs/api/dart_api/UIDriver).

```dart
abstract class EventResolver {
  final UIDriver driver;
  final DebugLogger? logger;

  EventResolver({
    required this.driver,
    this.logger,
  });

  Future<void> resolveEvent(BuildContext context, dynamic eventData);
}
```

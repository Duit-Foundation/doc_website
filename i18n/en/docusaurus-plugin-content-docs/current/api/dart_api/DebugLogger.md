# DebugLogger

:::danger Deprecated
The `DebugLogger` class is marked as deprecated and will be removed in the next major release.

Use [LoggingCapabilityDelegate](/docs/api/dart_api/LoggingCapabilityDelegate) instead.
:::

An interface that represents a contract for logger implementations.

```dart
abstract interface class DebugLogger {
  void info(String message);
  void warn(String message);
  void error(
    String message, {
    dynamic error,
    StackTrace? stackTrace,
  });
}
```

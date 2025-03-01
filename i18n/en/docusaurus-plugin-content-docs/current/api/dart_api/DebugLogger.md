# DebugLogger

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

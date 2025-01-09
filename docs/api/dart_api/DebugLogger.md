# DebugLogger

Интерфейс, представляющий контракт для реализаций логгера.

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
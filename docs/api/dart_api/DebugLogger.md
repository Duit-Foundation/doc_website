# DebugLogger

:::danger Deprecated
Класс `DebugLogger` помечен как deprecated и будет удален в следующем мажорном релизе.

Используйте [LoggingCapabilityDelegate](/docs/api/dart_api/LoggingCapabilityDelegate) вместо него.
:::

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
# LoggingCapabilityDelegate

Миксин, предоставляющий возможности логирования, совместимые с Talker API.

Определяет методы для логирования сообщений на разных уровнях: от verbose до critical.

## Методы

### logInfo

```dart
void logInfo(message, [Object? exception, StackTrace? stackTrace]);
```

Логирует информационное сообщение.

### logDebug

```dart
void logDebug(message, [Object? exception, StackTrace? stackTrace]);
```

Логирует отладочное сообщение. Используется для детальной информации, полезной при разработке.

### logWarning

```dart
void logWarning(message, [Object? exception, StackTrace? stackTrace]);
```

Логирует предупреждение о потенциальных проблемах или неожиданных условиях.

### logError

```dart
void logError(message, [Object? exception, StackTrace? stackTrace]);
```

Логирует сообщение об ошибке, указывающее на проблемы или сбои в приложении.

### logCritical

```dart
void logCritical(message, [Object? exception, StackTrace? stackTrace]);
```

Логирует критическую ошибку, требующую немедленного внимания.

### logVerbose

```dart
void logVerbose(message, [Object? exception, StackTrace? stackTrace]);
```

Логирует подробное сообщение для глубокой отладки.

## Пример реализации

```dart
final class ConsoleLogger with LoggingCapabilityDelegate {
  @override
  void logInfo(message, [Object? exception, StackTrace? stackTrace]) {
    print('[INFO] $message');
  }

  @override
  void logDebug(message, [Object? exception, StackTrace? stackTrace]) {
    print('[DEBUG] $message');
  }

  @override
  void logWarning(message, [Object? exception, StackTrace? stackTrace]) {
    print('[WARN] $message');
  }

  @override
  void logError(message, [Object? exception, StackTrace? stackTrace]) {
    print('[ERROR] $message');
    if (exception != null) print('Exception: $exception');
    if (stackTrace != null) print('StackTrace: $stackTrace');
  }

  @override
  void logCritical(message, [Object? exception, StackTrace? stackTrace]) {
    print('[CRITICAL] $message');
  }

  @override
  void logVerbose(message, [Object? exception, StackTrace? stackTrace]) {
    print('[VERBOSE] $message');
  }
}
```

## Использование с XDriver

```dart
final driver = XDriver.remote(
  transportManager: HttpTransportManager(...),
  loggingManager: ConsoleLogger(),
);
```

:::tip
Вы можете интегрировать `LoggingCapabilityDelegate` с популярными пакетами логирования, такими как [talker](https://pub.dev/packages/talker) или [logger](https://pub.dev/packages/logger).
:::

# LoggingCapabilityDelegate

A mixin that provides logging capabilities compatible with the Talker API.

Defines methods for logging messages at different levels: from verbose to critical.

## Methods

### logInfo

```dart
void logInfo(message, [Object? exception, StackTrace? stackTrace]);
```

Logs an informational message.

### logDebug

```dart
void logDebug(message, [Object? exception, StackTrace? stackTrace]);
```

Logs a debug message. Used for detailed information useful during development.

### logWarning

```dart
void logWarning(message, [Object? exception, StackTrace? stackTrace]);
```

Logs a warning about potential issues or unexpected conditions.

### logError

```dart
void logError(message, [Object? exception, StackTrace? stackTrace]);
```

Logs an error message indicating problems or failures in the application.

### logCritical

```dart
void logCritical(message, [Object? exception, StackTrace? stackTrace]);
```

Logs a critical error requiring immediate attention.

### logVerbose

```dart
void logVerbose(message, [Object? exception, StackTrace? stackTrace]);
```

Logs a verbose message for deep debugging.

## Implementation Example

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

## Using with XDriver

```dart
final driver = XDriver.remote(
  transportManager: HttpTransportManager(...),
  loggingManager: ConsoleLogger(),
);
```

:::tip
You can integrate `LoggingCapabilityDelegate` with popular logging packages like [talker](https://pub.dev/packages/talker) or [logger](https://pub.dev/packages/logger).
:::

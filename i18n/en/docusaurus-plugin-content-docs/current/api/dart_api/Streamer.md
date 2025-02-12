# Streamer

Дополнительный интерфейс для совместного использования с Transport. Позволяет реализовать обработку действий и событий для транспортов, которые используют постоянное соединение, например WebSocket.

```dart
abstract class Streamer {
  Stream<Map<String, dynamic>> get eventStream;
}
```
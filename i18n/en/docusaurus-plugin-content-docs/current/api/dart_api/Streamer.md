# Streamer

An additional interface used in conjunction with Transport. Allows implementing action and event handling for transports that use persistent connections, such as WebSocket.

```dart
abstract class Streamer {
  Stream<Map<String, dynamic>> get eventStream;
}
```
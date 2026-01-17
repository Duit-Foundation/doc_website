# Streamer

:::danger Deprecated
The `Streamer` class is marked as deprecated and will be removed in the next major release.

Event streaming is now implemented directly through [TransportCapabilityDelegate](/docs/api/dart_api/TransportCapabilityDelegate).
:::

An additional interface used in conjunction with Transport. Allows implementing action and event handling for transports that use persistent connections, such as WebSocket.

```dart
abstract class Streamer {
  Stream<Map<String, dynamic>> get eventStream;
}
```

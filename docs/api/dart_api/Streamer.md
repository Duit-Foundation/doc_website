# Streamer

:::danger Deprecated
Класс `Streamer` помечен как deprecated и будет удален в следующем мажорном релизе.

Поток событий теперь реализуется непосредственно через [TransportCapabilityDelegate](/docs/api/dart_api/TransportCapabilityDelegate).
:::

Дополнительный интерфейс для совместного использования с Transport. Позволяет реализовать обработку действий и событий для транспортов, которые используют постоянное соединение, например WebSocket.

```dart
abstract class Streamer {
  Stream<Map<String, dynamic>> get eventStream;
}
```
# WSTransportManager

WebSocket transport manager for working with a remote Duit server.

Implements [TransportCapabilityDelegate](/docs/api/dart_api/TransportCapabilityDelegate) and provides bidirectional communication with the server via WebSocket connection for fetching UI layouts and handling real-time events.

## Constructor

```dart
WSTransportManager({
  required String url,
  String baseUrl = "",
  Map<String, String> defaultHeaders = const {},
  Converter<Object?, String>? encoder,
  Converter<Uint8List, Object?>? decoder,
});
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `url` | `String` | — | URL for WebSocket connection (required) |
| `baseUrl` | `String` | `""` | Base URL (optional) |
| `defaultHeaders` | `Map<String, String>` | `{}` | Headers for establishing connection |
| `encoder` | `Converter?` | `null` | Custom encoder for outgoing messages |
| `decoder` | `Converter?` | `null` | Custom decoder for incoming messages |

## Features

- Supports persistent bidirectional connection
- Automatically processes incoming server events
- Allows sending actions and receiving UI updates in real-time

## Usage Examples

### Basic Usage

```dart
final driver = XDriver.remote(
  transportManager: WSTransportManager(
    url: 'ws://api.example.com/ws',
  ),
);
```

### With Authorization and Custom Decoder

```dart
final driver = XDriver.remote(
  transportManager: WSTransportManager(
    url: 'wss://api.example.com/ws',
    defaultHeaders: {
      'Authorization': 'Bearer $token',
    },
    decoder: MyCustomDecoder(),
  ),
);
```

## Message Format

When executing actions, `WSTransportManager` sends messages in the following format:

```json
{
  "event": "<action_event_name>",
  "payload": {
    // action data
  }
}
```

:::tip
WebSocket transport is ideal for applications requiring real-time UI updates, such as chats, dashboards, or collaborative tools.
:::

:::warning
The URL for WebSocket connection must start with `ws://` or `wss://` (for secure connection).
:::

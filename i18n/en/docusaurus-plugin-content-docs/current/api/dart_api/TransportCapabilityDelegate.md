# TransportCapabilityDelegate

A mixin that provides an interface for managing the transport layer in the Duit UI system.

Classes using this delegate must implement methods for handling server actions, requests, and server connections.

## Methods

### linkDriver

```dart
void linkDriver(UIDriver driver);
```

Links the delegate to a driver instance.

### executeRemoteAction

```dart
Future<Map<String, dynamic>?> executeRemoteAction(
  ServerAction action,
  Map<String, dynamic> payload,
);
```

Executes a server action with the provided payload.

**Parameters:**
- `action` — server action to execute
- `payload` — additional data required for the action

### request

```dart
Future<Map<String, dynamic>?> request(
  String url,
  Map<String, dynamic> meta,
  Map<String, dynamic> body,
);
```

Sends a request to the server.

**Parameters:**
- `url` — URL to send the request to
- `meta` — request metadata
- `body` — request body

### connect

```dart
Stream<Map<String, dynamic>> connect({
  Map<String, dynamic>? initialRequestData,
  Map<String, dynamic>? staticContent,
});
```

Establishes a connection to the server.

**Returns:** A `Stream` that emits server events. The stream may emit a single event when connection is established or continue emitting events in streaming mode.

### releaseResources

```dart
void releaseResources();
```

Releases external resources, subscriptions, or handlers.

## Ready-to-use Implementations

- [HttpTransportManager](/docs/api/dart_api/HttpTransportManager) — HTTP transport
- [WSTransportManager](/docs/api/dart_api/WSTransportManager) — WebSocket transport
- [StubTransportManager](/docs/api/dart_api/StubTransportManager) — stub for testing

## Usage Example

```dart
final class MyCustomTransport with TransportCapabilityDelegate {
  @override
  void linkDriver(UIDriver driver) {
    // Save driver reference
  }

  @override
  Stream<Map<String, dynamic>> connect({
    Map<String, dynamic>? initialRequestData,
    Map<String, dynamic>? staticContent,
  }) async* {
    // Connection implementation
    yield {'type': 'Container', 'child': ...};
  }

  @override
  Future<Map<String, dynamic>?> executeRemoteAction(
    ServerAction action,
    Map<String, dynamic> payload,
  ) async {
    // Execute action
    return {};
  }

  @override
  Future<Map<String, dynamic>?> request(
    String url,
    Map<String, dynamic> meta,
    Map<String, dynamic> body,
  ) async {
    // Execute request
    return {};
  }

  @override
  void releaseResources() {
    // Cleanup resources
  }
}
```

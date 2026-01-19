# Transport Layer

Duit enables the ability to request and receive the initial layout of screens/widgets, handle actions, publish them to the server, and receive events in response to executed actions. All these interactions occur through the transport layer, which implements mechanisms for transmitting data over the network or integrating with native applications.

## Types of Transports

Out-of-the-box, Duit provides the following transport layer implementations:

- `HttpTransportManager` — for working with the HTTP protocol, including support for SSE (Server-Sent Events)
- `WSTransportManager` — for working with the WebSocket protocol
- `StubTransportManager` — a stub for testing and static content
- `NativeTransportManager` — for integration with native applications

The `HttpTransportManager` implementation uses the [http](https://pub.dev/packages/http) package as its HTTP client.

The `WSTransportManager` implementation utilizes the [dart:io](https://dart.dev/libraries/dart-io) library on native platforms and [web](https://pub.dev/packages/web) in the browser.

## Transport Interface

All transport layer implementations adhere to the `TransportCapabilityDelegate` mixin.

This interface includes the following methods:

- `connect`: Responsible for executing the request for the initial screen/widget layout. Returns a `Stream<Map<String, dynamic>>`, allowing for streaming data (e.g., SSE).
- `releaseResources`: Cleans up resources.
- `executeRemoteAction`: Executes actions on the server.
- `request`: A utility method for performing arbitrary requests or publishing events. Designed for internal use by Duit tools, e.g., `ScriptRunner`.
- `linkDriver`: Used to link the transport with the UI driver.

## Using Transport with XDriver

The transport layer is configured through the public API using `XDriver`. Transport configuration occurs during the creation of an `XDriver` instance by passing the required transport manager.

### Remote Mode

Used for dynamically loading the UI from a server:

```dart
late final XDriver driver;

@override
void initState() {
  driver = XDriver.remote(
    transportManager: HttpTransportManager(
      url: "/example_screen",
      baseUrl: "http://localhost:8999",
      defaultHeaders: {
        "Content-Type": "application/json",
      },
    ),
    initialRequestPayload: {
      "userId": "12345",
    },
  );
  driver.init();
  super.initState();
}

@override
void dispose() {
  driver.dispose();
  super.dispose();
}
```

### Static Mode

Used for working with predefined JSON content without network requests:

```dart
final uiContent = {
  'type': 'Column',
  'children': [
    {'type': 'Text', 'data': 'Hello World'},
  ],
};

final driver = XDriver.static(uiContent);
```

### Native Module Mode

Used for integrating Duit as a module into an existing native application:

```dart
final driver = XDriver.nativeModule(
  initialRequestPayload: {
    'hostVersion': '1.0.0',
  },
);
```

## HttpTransportManager Configuration

`HttpTransportManager` supports the following configuration parameters:

| Parameter | Type | Description |
|-----------|------|-------------|
| `url` | `String` | The path for requests (required) |
| `baseUrl` | `String` | The base URL of the server |
| `defaultHeaders` | `Map<String, String>` | Default headers |
| `requestInterceptor` | `Function(Request)?` | HTTP request interceptor |
| `errorInterceptor` | `Function(Object?)?` | Error interceptor |
| `encoder` | `Converter<Object?, String>?` | Custom data encoder |
| `decoder` | `Converter<Uint8List, Object?>?` | Custom response decoder |
| `initialRequestMethod` | `String` | HTTP method for the initial request (default is "GET") |
| `useSSEConn` | `bool` | Enable SSE connection mode |

### SSE Example

```dart
final driver = XDriver.remote(
  transportManager: HttpTransportManager(
    url: "/sse-stream",
    baseUrl: "http://localhost:8999",
    useSSEConn: true,
    defaultHeaders: {
      "Authorization": "Bearer token",
    },
  ),
);
```

## WSTransportManager Configuration

`WSTransportManager` supports the following parameters:

| Parameter | Type | Description |
|-----------|------|-------------|
| `url` | `String` | The WebSocket connection path (required) |
| `baseUrl` | `String` | The base URL (must start with `ws://` or `wss://`) |
| `defaultHeaders` | `Map<String, String>` | Connection headers |
| `encoder` | `Converter<Object?, String>?` | Custom message encoder |
| `decoder` | `Converter<Uint8List, Object?>?` | Custom message decoder |

### WebSocket Example

```dart
final driver = XDriver.remote(
  transportManager: WSTransportManager(
    url: "/ws",
    baseUrl: "ws://localhost:8999",
  ),
);
```

## Creating Custom Transport

Duit allows creating custom transport layer implementations to use third-party HTTP clients or other network protocols.

To do so, create a class that implements the `TransportCapabilityDelegate` mixin:

```dart
final class MyCustomTransport with TransportCapabilityDelegate {
  @override
  void linkDriver(UIDriver driver) {
    // Save driver reference if needed
  }

  @override
  Stream<Map<String, dynamic>> connect({
    Map<String, dynamic>? initialRequestData,
    Map<String, dynamic>? staticContent,
  }) async* {
    if (staticContent != null) {
      yield staticContent;
      return;
    }
    
    // Implement connection logic
    final response = await myCustomHttpClient.get('/layout');
    yield response.data;
  }

  @override
  Future<Map<String, dynamic>?> executeRemoteAction(
    ServerAction action,
    Map<String, dynamic> payload,
  ) async {
    // Implement action execution
    return await myCustomHttpClient.post(action.eventName, payload);
  }

  @override
  Future<Map<String, dynamic>?> request(
    String url,
    Map<String, dynamic> meta,
    Map<String, dynamic> body,
  ) async {
    // Implement arbitrary requests
    return await myCustomHttpClient.request(url, body);
  }

  @override
  void releaseResources() {
    // Release resources
    myCustomHttpClient.close();
  }
}
```

Usage:

```dart
final driver = XDriver.remote(
  transportManager: MyCustomTransport(),
);
```

## Role of Transport in Native Application Integration

`NativeTransportManager` is a special implementation of the `TransportCapabilityDelegate` mixin that provides an asynchronous API for interacting with native applications and ensuring data exchange between Dart code and native, built on [Platform channels](https://docs.flutter.dev/platform-integration/platform-channels#architecture).

In this integration method, the native part of the application is responsible for network interaction, which in turn forwards data and events to the Dart side, where Duit processes them.

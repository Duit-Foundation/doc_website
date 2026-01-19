# HttpTransportManager

HTTP transport manager for working with a remote Duit server.

Implements [TransportCapabilityDelegate](/docs/api/dart_api/TransportCapabilityDelegate) and provides HTTP communication with the server for fetching UI layouts and executing server actions.

## Constructor

```dart
HttpTransportManager({
  required String url,
  String baseUrl = "",
  Map<String, String> defaultHeaders = const {},
  void Function(Request request)? requestInterceptor,
  void Function(Object? error)? errorInterceptor,
  Converter<Object?, String>? encoder,
  Converter<Uint8List, Object?>? decoder,
  String initialRequestMethod = "GET",
  bool useSSEConn = false,
});
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `url` | `String` | — | URL for the initial request (required) |
| `baseUrl` | `String` | `""` | Base URL for all HTTP requests |
| `defaultHeaders` | `Map<String, String>` | `{}` | Headers added to every request |
| `requestInterceptor` | `Function?` | `null` | Interceptor for modifying requests before sending |
| `errorInterceptor` | `Function?` | `null` | Handler for HTTP request errors |
| `encoder` | `Converter?` | `null` | Custom encoder for request body |
| `decoder` | `Converter?` | `null` | Custom decoder for server response |
| `initialRequestMethod` | `String` | `"GET"` | HTTP method for the initial request |
| `useSSEConn` | `bool` | `false` | Enable SSE (Server-Sent Events) mode |

## Usage Examples

### Basic Usage

```dart
final driver = XDriver.remote(
  transportManager: HttpTransportManager(
    url: '/api/layout',
    baseUrl: 'https://api.example.com',
  ),
);
```

### With Custom Headers and Interceptors

```dart
final driver = XDriver.remote(
  transportManager: HttpTransportManager(
    url: '/api/layout',
    baseUrl: 'https://api.example.com',
    defaultHeaders: {
      'Authorization': 'Bearer $token',
      'X-Custom-Header': 'value',
    },
    requestInterceptor: (request) {
      print('Sending request to: ${request.url}');
    },
    errorInterceptor: (error) {
      print('HTTP Error: $error');
    },
  ),
);
```

### With Server-Sent Events (SSE)

```dart
final driver = XDriver.remote(
  transportManager: HttpTransportManager(
    url: '/api/sse',
    baseUrl: 'https://api.example.com',
    useSSEConn: true,
  ),
);
```

:::tip
SSE mode allows the server to send UI updates in real-time through a persistent HTTP connection.
:::

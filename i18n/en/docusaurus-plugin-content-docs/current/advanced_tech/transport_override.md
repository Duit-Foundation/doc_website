# Overriding the Transport Layer Implementation

Often, developers use third-party packages, such as [dio](https://pub.dev/packages/dio), for networking in their applications.

While Duit's base implementation relies on the [http](https://pub.dev/packages/http) package, it allows developers to integrate their preferred tools or implement networking using other protocols (e.g., gRPC, GraphQL) by overriding the transport layer.

## Implementing TransportOptions

This class handles the configuration of the transport layer and is utilized when creating an instance of `DuitDriver`. It can contain any properties necessary for operation.

```dart
final class DioTransportOpions extends TransportOptions {
  @override
  String? baseUrl;

  @override
  Map<String, String> defaultHeaders = const {};

  @override
  String type = "dio";

  final Dio dioInstance;

  DioTransportOpions(this.dioInstance);
}
```

## Implementing Transport

The abstract class `Transport` handles direct interaction with the network (in our case, using dio).

The class requires implementing four core methods:

1. **connect** — Called during driver initialization to fetch the initial screen or widget layout.
2. **dispose** — Cleans up transport resources. Invoked when the parent driver is destroyed.
3. **execute** — Performs a given action (HTTP request) and returns a new event or set of events.
4. **request** — Utility method for issuing arbitrary requests to a specified URL with supplied data.

:::tip
Implementing the `request` method is only mandatory if the transport is used alongside an integrated script execution environment. Learn more in the corresponding [section](advanced_tech/scripting.mdx).
:::

```dart
final class DioTransport extends Transport {
  final DioTransportOpions opts;

  DioTransport(this.opts) : super("/initial_path");

  @override
  Future<Map<String, dynamic>?> connect({Map<String, dynamic>? initialData}) {
    // TODO: implement connect
    throw UnimplementedError();
  }

  @override
  void dispose() {
    // TODO: implement dispose
  }

  @override
  FutureOr<Map<String, dynamic>?> execute(
      ServerAction action, Map<String, dynamic> payload) {
    // TODO: implement execute
    throw UnimplementedError();
  }

  @override
  FutureOr<Map<String, dynamic>?> request(
      String url, Map<String, dynamic> meta, Map<String, dynamic> body) {
    // TODO: implement request
    throw UnimplementedError();
  }
}
```

## Extending UIDriver

UIDriver extensions offer a safe way to override certain foundational parts of the framework, such as `Transport` or `ScriptRunner`.

```dart
extension DioExtension on UIDriver {
  void applyDioExtension() {
    transport = DioTransport(
      transportOptions as DioTransportOpions,
    );
  }
}
```
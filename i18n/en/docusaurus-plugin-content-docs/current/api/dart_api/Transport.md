# Transport

Интерфейст реализации транспортного слоя, с которой взамодействует `UIDriver`. Предоставляет методы для работы фреймворка с сетью.

```dart
abstract class Transport {
  final String url;

  /// Constructs a new [Transport] instance with the specified URL.
  ///
  /// The [url] parameter represents the URL for the transport connection.
  Transport(this.url);

  /// Executes a server action with the given payload and returns a server event.
  ///
  /// The [action] parameter represents the server action to execute.
  /// The [payload] parameter contains any additional data required for the action.
  /// Returns a [ServerEvent] object representing the server's response.
  FutureOr<Map<String, dynamic>?> execute(
    ServerAction action,
    Map<String, dynamic> payload,
  );

  /// Sends a request to the server.
  FutureOr<Map<String, dynamic>?> request(
    String url,
    Map<String, dynamic> meta,
    Map<String, dynamic> body,
  );

  /// Establishes a connection to the server.
  ///
  /// Returns a [Future] that completes when the connection is established.
  Future<Map<String, dynamic>?> connect({
    Map<String, dynamic>? initialData,
  });

  /// Disposes of any resources associated with the transport.
  ///
  /// This method should be called when the transport is no longer needed.
  void dispose();
}
```
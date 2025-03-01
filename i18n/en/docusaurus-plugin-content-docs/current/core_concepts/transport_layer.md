# Transport Layer

Duit enables the ability to request and receive the initial layout of screens/widgets, handle actions, publish them to the server, and receive events in response to executed actions. All these interactions occur through the transport layer, which implements mechanisms for transmitting data over the network or integrating with native applications.

## Types of Transports

Out-of-the-box, Duit supports two major types of transports designed to work with specific network protocols: `HttpTransport` and `WebSocketTransport` for HTTP and WS respectively.

The `HttpTransport` implementation uses the [http](https://pub.dev/packages/http) package as its HTTP client.

The `WebSocketTransport` implementation utilizes the implementation provided by the [dart:io](https://dart.dev/libraries/dart-io) library.

## Transport Interface

All transport layer implementations adhere to the `Transport` interface.

This interface includes the following methods:

- `connect`: Responsible for executing the request for the initial screen/widget layout.
- `dispose`: Cleans up resources.
- `execute`: Executes actions.
- `request`: A utility method for performing arbitrary requests or publishing events. Designed for internal use by Duit tools, e.g., `ScriptRunner`.

## Configuring the Transport Layer

Configuring the transport layer is done using classes derived from `TransportOptions`. This class represents the base configuration required to initialize the desired transport with specified parameters.

Transport configuration occurs during the creation of a `DuitDriver` instance by passing the necessary `HttpTransportOptions` or `WebSocketTransportOptions` object.

```dart
  late final DuitDriver driver;

@override
void initState() {
  driver = DuitDriver(
    "/example_screen",
    transportOptions: HttpTransportOptions(
      defaultHeaders: {
        "Content-Type": "application/json",
      },
      baseUrl: "http://localhost:8999",
      decoder: CustomDecoder(),
    ),
  );
  super.initState();
}
```

## Using Third-Party HTTP Clients and Network Protocols

Duit allows overriding the transport layer to utilize third-party HTTP clients or implement networking protocols used in your application instead of those supported out-of-the-box.

To do so, you need to create custom implementations of the `Transport` and `TransportOptions` interfaces. You can learn more about overriding the transport layer in the corresponding section of the documentation [here](advanced_tech/transport_override.md).

<!-- ## Роль транспорта в интеграции с нативными приложениями

`NativeTransport` - особая реализация интерфейса `Transport`, предоставляющая асинхронный API для
взаимодействия c
нативными приложениями и обеспечением обмена данными между Dart-кодом и нативом, построенный на
базе [`Platform channels`](https://docs.flutter.dev/platform-integration/platform-channels#architecture).
При таком способе интеграции за взаимодействие с сетью отвечает нативная часть приложения, которая в
свою очередь пересылает данные и события на сторону Dart, где Duit обрабатывает их.

Подробнее об этой части функционала Duit можно узнать в
соотвествующем [разделе](/docs/core_concepts/native) документации. -->
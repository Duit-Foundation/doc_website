# TransportOptions

:::danger Deprecated
The `TransportOptions` class is marked as deprecated and will be removed in the next major release.

Use [TransportCapabilityDelegate](/docs/api/dart_api/TransportCapabilityDelegate) and its implementations ([HttpTransportManager](/docs/api/dart_api/HttpTransportManager), [WSTransportManager](/docs/api/dart_api/WSTransportManager)) instead.
:::

The TransportOptions class represents the base options for configuring the transport.

```dart
abstract class TransportOptions {
  /// The type of the transport.
  abstract String type;

  /// The base URL for the transport.
  abstract String? baseUrl;

  /// The default headers to be included in the transport requests.
  abstract Map<String, String> defaultHeaders;
}
```

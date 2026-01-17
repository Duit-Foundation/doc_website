# TransportOptions

:::danger Deprecated
Класс `TransportOptions` помечен как deprecated и будет удален в следующем мажорном релизе.

Используйте [TransportCapabilityDelegate](/docs/api/dart_api/TransportCapabilityDelegate) и его реализации ([HttpTransportManager](/docs/api/dart_api/HttpTransportManager), [WSTransportManager](/docs/api/dart_api/WSTransportManager)) вместо него.
:::

Класс TransportOptions представляет базовые опции для настройки транспорта.

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

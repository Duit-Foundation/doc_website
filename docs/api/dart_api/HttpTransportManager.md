# HttpTransportManager

Менеджер HTTP-транспорта для работы с удаленным сервером Duit.

Реализует [TransportCapabilityDelegate](/docs/api/dart_api/TransportCapabilityDelegate) и обеспечивает HTTP-связь с сервером для получения UI-разметки и выполнения серверных действий.

## Конструктор

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

## Параметры

| Параметр | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| `url` | `String` | — | URL для первоначального запроса (обязательный) |
| `baseUrl` | `String` | `""` | Базовый URL для всех HTTP-запросов |
| `defaultHeaders` | `Map<String, String>` | `{}` | Заголовки, добавляемые к каждому запросу |
| `requestInterceptor` | `Function?` | `null` | Перехватчик для модификации запросов перед отправкой |
| `errorInterceptor` | `Function?` | `null` | Обработчик ошибок HTTP-запросов |
| `encoder` | `Converter?` | `null` | Кастомный кодировщик для тела запроса |
| `decoder` | `Converter?` | `null` | Кастомный декодер для ответа сервера |
| `initialRequestMethod` | `String` | `"GET"` | HTTP-метод для первоначального запроса |
| `useSSEConn` | `bool` | `false` | Включить режим SSE (Server-Sent Events) |

## Пример использования

### Базовое использование

```dart
final driver = XDriver.remote(
  transportManager: HttpTransportManager(
    url: '/api/layout',
    baseUrl: 'https://api.example.com',
  ),
);
```

### С кастомными заголовками и перехватчиками

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

### С Server-Sent Events (SSE)

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
Режим SSE позволяет серверу отправлять обновления UI в реальном времени через постоянное HTTP-соединение.
:::

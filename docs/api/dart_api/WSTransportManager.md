# WSTransportManager

Менеджер WebSocket-транспорта для работы с удаленным сервером Duit.

Реализует [TransportCapabilityDelegate](/docs/api/dart_api/TransportCapabilityDelegate) и обеспечивает двустороннюю связь с сервером через WebSocket-соединение для получения UI-разметки и обработки событий в реальном времени.

## Конструктор

```dart
WSTransportManager({
  required String url,
  String baseUrl = "",
  Map<String, String> defaultHeaders = const {},
  Converter<Object?, String>? encoder,
  Converter<Uint8List, Object?>? decoder,
});
```

## Параметры

| Параметр | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| `url` | `String` | — | URL для WebSocket-соединения (обязательный) |
| `baseUrl` | `String` | `""` | Базовый URL (опционально) |
| `defaultHeaders` | `Map<String, String>` | `{}` | Заголовки для установки соединения |
| `encoder` | `Converter?` | `null` | Кастомный кодировщик для исходящих сообщений |
| `decoder` | `Converter?` | `null` | Кастомный декодер для входящих сообщений |

## Особенности

- Поддерживает постоянное двустороннее соединение
- Автоматически обрабатывает входящие события от сервера
- Позволяет отправлять действия и получать обновления UI в реальном времени

## Пример использования

### Базовое использование

```dart
final driver = XDriver.remote(
  transportManager: WSTransportManager(
    url: 'ws://api.example.com/ws',
  ),
);
```

### С авторизацией и кастомным декодером

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

## Формат сообщений

При выполнении действий, `WSTransportManager` отправляет сообщения в следующем формате:

```json
{
  "event": "<action_event_name>",
  "payload": {
    // данные действия
  }
}
```

:::tip
WebSocket-транспорт идеально подходит для приложений, требующих обновления UI в реальном времени, таких как чаты, дашборды или коллаборативные инструменты.
:::

:::warning
URL для WebSocket-соединения должен начинаться с `ws://` или `wss://` (для защищенного соединения).
:::

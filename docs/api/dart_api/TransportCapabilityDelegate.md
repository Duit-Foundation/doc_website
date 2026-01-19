# TransportCapabilityDelegate

Миксин, предоставляющий интерфейс для управления транспортным слоем в системе Duit UI.

Классы, использующие этот делегат, должны реализовать методы для обработки серверных действий, запросов и соединений с сервером.

## Методы

### linkDriver

```dart
void linkDriver(UIDriver driver);
```

Связывает делегат с экземпляром драйвера.

### executeRemoteAction

```dart
Future<Map<String, dynamic>?> executeRemoteAction(
  ServerAction action,
  Map<String, dynamic> payload,
);
```

Выполняет серверное действие с переданной полезной нагрузкой.

**Параметры:**
- `action` — серверное действие для выполнения
- `payload` — дополнительные данные, необходимые для действия

### request

```dart
Future<Map<String, dynamic>?> request(
  String url,
  Map<String, dynamic> meta,
  Map<String, dynamic> body,
);
```

Отправляет запрос на сервер.

**Параметры:**
- `url` — URL для отправки запроса
- `meta` — метаданные запроса
- `body` — тело запроса

### connect

```dart
Stream<Map<String, dynamic>> connect({
  Map<String, dynamic>? initialRequestData,
  Map<String, dynamic>? staticContent,
});
```

Устанавливает соединение с сервером.

**Возвращает:** `Stream`, который эмитит события от сервера. Поток может эмитить одно событие при установке соединения или продолжать эмитить события в потоковом режиме.

### releaseResources

```dart
void releaseResources();
```

Освобождает внешние ресурсы, подписки или обработчики.

## Готовые реализации

- [HttpTransportManager](/docs/api/dart_api/HttpTransportManager) — HTTP-транспорт
- [WSTransportManager](/docs/api/dart_api/WSTransportManager) — WebSocket-транспорт
- [StubTransportManager](/docs/api/dart_api/StubTransportManager) — заглушка для тестирования

## Пример использования

```dart
final class MyCustomTransport with TransportCapabilityDelegate {
  @override
  void linkDriver(UIDriver driver) {
    // Сохранить ссылку на драйвер
  }

  @override
  Stream<Map<String, dynamic>> connect({
    Map<String, dynamic>? initialRequestData,
    Map<String, dynamic>? staticContent,
  }) async* {
    // Реализация подключения
    yield {'type': 'Container', 'child': ...};
  }

  @override
  Future<Map<String, dynamic>?> executeRemoteAction(
    ServerAction action,
    Map<String, dynamic> payload,
  ) async {
    // Выполнение действия
    return {};
  }

  @override
  Future<Map<String, dynamic>?> request(
    String url,
    Map<String, dynamic> meta,
    Map<String, dynamic> body,
  ) async {
    // Выполнение запроса
    return {};
  }

  @override
  void releaseResources() {
    // Очистка ресурсов
  }
}
```

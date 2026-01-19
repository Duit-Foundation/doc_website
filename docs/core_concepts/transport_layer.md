# Транспортный слой

Duit обеспечивает возможность запроса и получения начального макета экрана/виджета, а также
обработки действий, их публикации на сервер и получение событий в качестве ответа на выполненное
действие. Все эти взаимодействия происходят благодаря транспортному слою, который реализует
механизмы передачи данных по сети или при интеграции с нативным приложением.

## Виды транспорта

Duit из коробки предоставляет следующие реализации транспортного слоя:

- `HttpTransportManager` — для работы по протоколу HTTP, включая поддержку SSE (Server-Sent Events)
- `WSTransportManager` — для работы по протоколу WebSocket
- `StubTransportManager` — заглушка для тестирования и статического контента
- `NativeTransportManager` — для интеграции с нативными приложениями

Реализация `HttpTransportManager` использует в качестве http-клиента
пакет [http](https://pub.dev/packages/http).

Реализация `WSTransportManager` использует реализацию из пакета [dart:io](https://dart.dev/libraries/dart-io)
на нативных платформах и [web](https://pub.dev/packages/web) в браузере.

## Интерфейс транспорта

Все реализации транспортного слоя реализуют mixin `TransportCapabilityDelegate`.

В этот интерфейс входят следующие методы:

- `connect` — метод, отвечающий за выполнение запроса начального макета экрана/виджета. Возвращает
  `Stream<Map<String, dynamic>>`, что позволяет использовать потоковую передачу данных (например, SSE).
- `releaseResources` — метод очистки ресурсов
- `executeRemoteAction` — метод для выполнения действий на сервере
- `request` — служебный метод для выполнения произвольных запросов или публикации событий.
  Предназначен для использования внутренними инструментами Duit, например `ScriptRunner`.
- `linkDriver` — метод для связывания транспорта с драйвером UI

## Использование транспорта с XDriver

Для работы с транспортным слоем используется публичный API через `XDriver`. Конфигурация транспорта
происходит на этапе создания экземпляра `XDriver` путем передачи необходимого менеджера транспорта.

### Режим Remote

Используется для динамической загрузки UI с сервера:

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

### Режим Static

Используется для работы с предопределённым JSON-контентом без сетевых запросов:

```dart
final uiContent = {
  'type': 'Column',
  'children': [
    {'type': 'Text', 'data': 'Hello World'},
  ],
};

final driver = XDriver.static(uiContent);
```

### Режим Native Module

Используется для интеграции Duit как модуля в существующее нативное приложение:

```dart
final driver = XDriver.nativeModule(
  initialRequestPayload: {
    'hostVersion': '1.0.0',
  },
);
```

## Конфигурация HttpTransportManager

`HttpTransportManager` поддерживает следующие параметры конфигурации:

| Параметр | Тип | Описание |
|----------|-----|----------|
| `url` | `String` | Путь для запросов (обязательный) |
| `baseUrl` | `String` | Базовый URL сервера |
| `defaultHeaders` | `Map<String, String>` | Заголовки по умолчанию |
| `requestInterceptor` | `Function(Request)?` | Перехватчик HTTP-запросов |
| `errorInterceptor` | `Function(Object?)?` | Перехватчик ошибок |
| `encoder` | `Converter<Object?, String>?` | Кастомный кодировщик данных |
| `decoder` | `Converter<Uint8List, Object?>?` | Кастомный декодировщик ответов |
| `initialRequestMethod` | `String` | HTTP-метод начального запроса (по умолчанию "GET") |
| `useSSEConn` | `bool` | Включить режим SSE-соединения |

### Пример с SSE

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

## Конфигурация WSTransportManager

`WSTransportManager` поддерживает следующие параметры:

| Параметр | Тип | Описание |
|----------|-----|----------|
| `url` | `String` | Путь WebSocket-соединения (обязательный) |
| `baseUrl` | `String` | Базовый URL (должен начинаться с `ws://` или `wss://`) |
| `defaultHeaders` | `Map<String, String>` | Заголовки соединения |
| `encoder` | `Converter<Object?, String>?` | Кастомный кодировщик сообщений |
| `decoder` | `Converter<Uint8List, Object?>?` | Кастомный декодировщик сообщений |

### Пример WebSocket

```dart
final driver = XDriver.remote(
  transportManager: WSTransportManager(
    url: "/ws",
    baseUrl: "ws://localhost:8999",
  ),
);
```

## Создание собственного транспорта

Duit допускает возможность создания собственных реализаций транспортного слоя для использования
сторонних http-клиентов или реализации иных сетевых протоколов.

Для этого требуется создать класс, реализующий mixin `TransportCapabilityDelegate`:

```dart
final class MyCustomTransport with TransportCapabilityDelegate {
  @override
  void linkDriver(UIDriver driver) {
    // Сохранить ссылку на драйвер при необходимости
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
    
    // Реализовать логику подключения
    final response = await myCustomHttpClient.get('/layout');
    yield response.data;
  }

  @override
  Future<Map<String, dynamic>?> executeRemoteAction(
    ServerAction action,
    Map<String, dynamic> payload,
  ) async {
    // Реализовать выполнение действий
    return await myCustomHttpClient.post(action.eventName, payload);
  }

  @override
  Future<Map<String, dynamic>?> request(
    String url,
    Map<String, dynamic> meta,
    Map<String, dynamic> body,
  ) async {
    // Реализовать произвольные запросы
    return await myCustomHttpClient.request(url, body);
  }

  @override
  void releaseResources() {
    // Освободить ресурсы
    myCustomHttpClient.close();
  }
}
```

Использование:

```dart
final driver = XDriver.remote(
  transportManager: MyCustomTransport(),
);
```

## Роль транспорта в интеграции с нативными приложениями

`NativeTransportManager` — особая реализация интерфейса `TransportCapabilityDelegate`,
предоставляющая асинхронный API для взаимодействия с нативными приложениями и обеспечением обмена
данными между Dart-кодом и нативом, построенный на базе
[Platform channels](https://docs.flutter.dev/platform-integration/platform-channels#architecture).

При таком способе интеграции за взаимодействие с сетью отвечает нативная часть приложения, которая в
свою очередь пересылает данные и события на сторону Dart, где Duit обрабатывает их.

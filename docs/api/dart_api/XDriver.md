# XDriver

Публичный API для работы с драйвером Duit.

`XDriver` является расширением типа (extension type) над [UIDriver](/docs/api/dart_api/UIDriver), предоставляющим удобный интерфейс для инициализации и управления Duit-приложением в различных режимах работы.

## Режимы работы

- **Remote** — подключение к удаленному серверу через транспортный слой
- **Static** — работа с предварительно заданным JSON-контентом без серверных запросов
- **Native Module** — интеграция Duit как модуля в существующее нативное приложение

## Конструкторы

### XDriver.remote

Создает драйвер для работы с удаленным сервером Duit.

```dart
final driver = XDriver.remote(
  transportManager: HttpTransportManager(
    url: '/api/layout',
    baseUrl: 'https://api.example.com',
  ),
  initialRequestPayload: {
    'userId': '12345',
    'theme': 'dark',
  },
  loggingManager: CustomLogger(),
);
```

**Обязательные параметры:**
- `transportManager` — менеджер транспортного слоя для связи с сервером

**Опциональные параметры:**
- `initialRequestPayload` — дополнительные данные для первого запроса к серверу
- `nativeModuleManager` — делегат для управления нативными модулями
- `scriptingManager` — делегат для выполнения клиентских скриптов
- `loggingManager` — делегат для настройки логирования
- `focusManager` — делегат для управления фокусом UI-элементов
- `actionManager` — делегат для выполнения серверных действий
- `controllerManager` — делегат для управления UI-контроллерами
- `viewManager` — делегат для управления моделями представления

### XDriver.static

Создает драйвер для работы со статическим JSON-контентом.

```dart
final uiContent = {
  'type': 'Column',
  'children': [
    {'type': 'Text', 'data': 'Hello World'},
  ],
};

final driver = XDriver.static(uiContent);
```

**Обязательные параметры:**
- `content` — JSON-структура с описанием UI согласно спецификации Duit

**Выбрасывает:**
- `StateError` если `content` пуст

### XDriver.nativeModule

Создает драйвер для режима нативного модуля.

```dart
final driver = XDriver.nativeModule(
  nativeModuleManager: MyNativeModuleManager(),
  initialRequestPayload: {
    'hostVersion': '1.0.0',
    'features': ['analytics', 'payments'],
  },
);
```

## Методы

### init

Инициализирует драйвер и подготавливает его к работе.

```dart
await driver.init();
```

Этот метод должен быть вызван перед использованием драйвера. Выполняет:
- Инициализацию транспортного слоя
- Загрузку начального UI-контента
- Настройку всех зарегистрированных делегатов и менеджеров

### dispose

Освобождает ресурсы, используемые драйвером.

```dart
driver.dispose();
```

### attachExternalHandler

Регистрирует обработчик внешних событий.

```dart
driver.attachExternalHandler(
  UserDefinedHandlerKind.custom('onButtonClick'),
  (eventData) {
    print('Button clicked: ${eventData['id']}');
  },
);
```

### addExternalEventStream

Добавляет внешний поток событий для обработки драйвером.

```dart
final websocketStream = WebSocketChannel.connect(
  Uri.parse('ws://example.com'),
).stream.map((data) => jsonDecode(data));

driver.addExternalEventStream(websocketStream);
```

## Пример использования

```dart
class MyWidget extends StatefulWidget {
  @override
  State<MyWidget> createState() => _MyWidgetState();
}

class _MyWidgetState extends State<MyWidget> {
  late final XDriver driver;

  @override
  void initState() {
    super.initState();
    driver = XDriver.remote(
      transportManager: HttpTransportManager(
        url: '/api/layout',
        baseUrl: 'https://api.example.com',
      ),
    );
  }

  @override
  void dispose() {
    driver.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return DuitViewHost.withDriver(
      driver: driver,
      placeholder: const CircularProgressIndicator(),
    );
  }
}
```

:::tip
Рекомендуется использовать `XDriver` вместе с [DuitViewHost](/docs/api/dart_api/DuitViewHost), который автоматически управляет жизненным циклом драйвера.
:::

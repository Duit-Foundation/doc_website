# ServerActionExecutionCapabilityDelegate

Миксин, предоставляющий интерфейс для выполнения серверных действий ([ServerAction](/docs/api/dart_api/action_api/ServerAction)) и обработки серверных событий ([ServerEvent](/docs/api/dart_api/action_api/ServerEvent)).

## Методы

### execute

```dart
Future<void> execute(ServerAction action);
```

Выполняет указанное серверное действие.

Реализации должны предоставить логику обработки и выполнения `ServerAction`, которая может включать коммуникацию с внешним API, выполнение скриптов или локальных операций.

### preparePayload

```dart
Map<String, dynamic> preparePayload(
  Iterable<ActionDependency> dependencies,
);
```

Подготавливает и возвращает payload из переданных зависимостей для отправки вместе с действием.

Обычно используется для извлечения локальных значений, состояния форм или данных, на которые ссылается действие.

### resolveEvent

```dart
Future<void> resolveEvent(BuildContext context, eventData);
```

Обрабатывает и разрешает входящее событие в указанном контексте.

**Параметры:**
- `context` — контекст виджета для навигации, диалогов и обновления состояния
- `eventData` — данные события (обычно распарсенный `ServerEvent`)

### addExternalEventStream

```dart
void addExternalEventStream(Stream<Map<String, dynamic>> stream);
```

Регистрирует внешний поток событий для обработки делегатом.

Позволяет интегрировать внешние источники событий (сокеты, платформенные каналы и т.д.) в систему обработки событий Duit.

### attachExternalHandler

```dart
void attachExternalHandler(
  UserDefinedHandlerKind type,
  UserDefinedEventHandler handle,
);
```

Регистрирует внешний обработчик для указанного типа пользовательского события.

**Параметры:**
- `type` — тип обработчика ([UserDefinedHandlerKind](/docs/api/dart_api/UserDefinedHandlerKind))
- `handle` — функция-обработчик события

### releaseResources

```dart
void releaseResources();
```

Освобождает внешние ресурсы, подписки и обработчики.

## UserDefinedHandlerKind

Перечисление типов пользовательских обработчиков событий:

```dart
enum UserDefinedHandlerKind {
  /// Обработчик для открытия URL
  openUrl,
  
  /// Обработчик для навигации
  navigation,
  
  /// Обработчик для пользовательских событий
  custom,
}
```

## UserDefinedEventHandler

Сигнатура функции-обработчика пользовательских событий:

```dart
typedef UserDefinedEventHandler = FutureOr<void> Function(
  BuildContext context,
  String path,
  Object? extra,
);
```

## Пример использования

```dart
// Регистрация обработчика навигации
driver.attachExternalHandler(
  UserDefinedHandlerKind.navigation,
  (context, path, extra) {
    Navigator.pushNamed(context, path, arguments: extra);
  },
);

// Регистрация обработчика открытия URL
driver.attachExternalHandler(
  UserDefinedHandlerKind.openUrl,
  (context, url, extra) async {
    if (await canLaunchUrl(Uri.parse(url))) {
      await launchUrl(Uri.parse(url));
    }
  },
);

// Регистрация кастомного обработчика
driver.attachExternalHandler(
  UserDefinedHandlerKind.custom,
  (context, key, extra) {
    print('Custom event: $key with data: $extra');
  },
);
```

## См. также

- [Действия и события](/docs/core_concepts/actions_events)

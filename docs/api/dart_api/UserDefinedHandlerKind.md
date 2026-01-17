# UserDefinedHandlerKind

Перечисление типов пользовательских обработчиков событий для регистрации в менеджере действий.

## Значения

### openUrl

```dart
UserDefinedHandlerKind.openUrl
```

Обработчик для событий открытия URL в браузере или приложении.

### navigation

```dart
UserDefinedHandlerKind.navigation
```

Обработчик для событий навигации внутри приложения (например, переход на новый экран).

### custom

```dart
UserDefinedHandlerKind.custom
```

Обработчик для пользовательских событий с произвольной логикой.

## UserDefinedEventHandler

Сигнатура функции-обработчика:

```dart
typedef UserDefinedEventHandler = FutureOr<void> Function(
  BuildContext context,
  String path,
  Object? extra,
);
```

**Параметры:**
- `context` — контекст виджета для доступа к дереву виджетов
- `path` — путь или URL (в зависимости от типа события)
- `extra` — дополнительные данные события (опционально)

## Пример использования

```dart
final driver = XDriver.remote(
  transportManager: HttpTransportManager(...),
);

// Обработчик навигации
driver.attachExternalHandler(
  UserDefinedHandlerKind.navigation,
  (context, path, extra) {
    Navigator.pushNamed(context, path, arguments: extra);
  },
);

// Обработчик открытия URL
driver.attachExternalHandler(
  UserDefinedHandlerKind.openUrl,
  (context, url, extra) async {
    final uri = Uri.parse(url);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri);
    }
  },
);

// Кастомный обработчик
driver.attachExternalHandler(
  UserDefinedHandlerKind.custom,
  (context, key, extra) {
    switch (key) {
      case 'show_dialog':
        showDialog(
          context: context,
          builder: (_) => AlertDialog(
            title: Text(extra?['title'] ?? 'Info'),
            content: Text(extra?['message'] ?? ''),
          ),
        );
        break;
      case 'analytics_event':
        analytics.logEvent(key, parameters: extra);
        break;
    }
  },
);
```

## См. также

- [ServerActionExecutionCapabilityDelegate](/docs/api/dart_api/ServerActionExecutionCapabilityDelegate)
- [Действия и события](/docs/core_concepts/actions_events)

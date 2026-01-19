# DuitViewHost

Виджет `DuitViewHost` отвечает за инициализацию связанного драйвера и подписку на обновления дерева виджетов в процессе работы Duit.

## Конструкторы

### DuitViewHost

Основной конструктор, принимающий `UIDriver` (автоматически оборачивается в `XDriver`).

```dart
DuitViewHost({
  required UIDriver driver,
  Widget? placeholder,
  Widget? child,
  bool invertStack = false,
  bool showChildInsteadOfPlaceholder = false,
  GestureInterceptor? gestureInterceptor,
  GestureInterceptorBehavior gestureInterceptorBehavior = GestureInterceptorBehavior.onlyWithAction,
  Widget Function(BuildContext context, Object? err)? errorWidgetBuilder,
  String viewTag = "",
  SliverGridDelegatesRegistry sliverGridDelegatesRegistry = const {},
});
```

### DuitViewHost.withDriver

Конструктор для использования с [XDriver](/docs/api/dart_api/XDriver) напрямую.

```dart
const DuitViewHost.withDriver({
  required XDriver driver,
  // ... остальные параметры аналогичны
});
```

## Параметры

| Параметр | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| `driver` | `UIDriver` / `XDriver` | — | Драйвер, управляющий представлением (обязательный) |
| `placeholder` | `Widget?` | `null` | Виджет-заглушка во время загрузки |
| `child` | `Widget?` | `null` | Дочерний виджет для наложения на Duit-представление |
| `invertStack` | `bool` | `false` | Порядок виджетов в Stack (true = child сверху) |
| `showChildInsteadOfPlaceholder` | `bool` | `false` | Показывать child вместо placeholder |
| `gestureInterceptor` | `Function?` | `null` | Перехватчик жестов |
| `errorWidgetBuilder` | `Function?` | `null` | Функция для построения виджета ошибки |
| `viewTag` | `String` | `""` | Тег для идентификации представления |
| `sliverGridDelegatesRegistry` | `Map` | `{}` | Реестр делегатов для SliverGrid |

## Пример использования

### Базовое использование

```dart
class MyScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final driver = XDriver.remote(
      transportManager: HttpTransportManager(
        url: '/api/layout',
        baseUrl: 'https://api.example.com',
      ),
    );

    return DuitViewHost.withDriver(
      driver: driver,
      placeholder: const Center(
        child: CircularProgressIndicator(),
      ),
    );
  }
}
```

### С обработкой ошибок

```dart
DuitViewHost.withDriver(
  driver: driver,
  placeholder: const CircularProgressIndicator(),
  errorWidgetBuilder: (context, error) {
    return Center(
      child: Text('Ошибка загрузки: $error'),
    );
  },
);
```

### С перехватчиком жестов

```dart
DuitViewHost.withDriver(
  driver: driver,
  gestureInterceptor: (gestureType, action, data) {
    print('Gesture: $gestureType, Action: $action');
  },
  gestureInterceptorBehavior: GestureInterceptorBehavior.always,
);
```

:::tip
Для управления жизненным циклом виджета вручную используйте методы `driver.init()` и `driver.dispose()` в соответствующих методах `State`.
:::
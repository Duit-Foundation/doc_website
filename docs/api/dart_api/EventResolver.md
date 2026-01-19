# EventResolver

:::danger Deprecated
Класс `EventResolver` помечен как deprecated и будет удален в следующем мажорном релизе.
:::

Абстрактный класс представляющий обработчик базовых событий. Класс отвечает за обработку событий с сервера и передачу потока выполнения [UIDriver](/docs/api/dart_api/UIDriver.md).

```dart
abstract class EventResolver {
  final UIDriver driver;
  final DebugLogger? logger;

  EventResolver({
    required this.driver,
    this.logger,
  });

  Future<void> resolveEvent(BuildContext context, dynamic eventData);
}
```
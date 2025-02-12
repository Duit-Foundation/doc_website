# DefaultActionParser

Базовая реализация интерфейса `Parser<ServerAction>`. Отвечает за корректный парсинг базового набора действий Duit. Возвращает `UnknownAction` в случае, если модель действиz невозмоджно обработать.

```dart
final class DefaultActionParser implements Parser<ServerAction> {
  @override
  ServerAction parse(Map<String, dynamic> json) {
    final view = ServerActionJsonView(json);

    return switch (view.executionType) {
      0 => TransportAction.fromJson(json),
      1 => LocalAction.fromJson(json),
      2 => ScriptAction.fromJson(json),
      _ => UnknownAction(),
    };
  }
}
```

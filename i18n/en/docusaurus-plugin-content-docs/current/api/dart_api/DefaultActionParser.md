# DefaultActionParser

Base implementation of the `Parser<ServerAction>` interface. Handles the correct parsing of Duit's basic set of actions. Returns `UnknownAction` if the action model cannot be processed.

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

# AnimatedPropHelper

Вспомогательное расширение типа для класса Map. Предоставляет геттеры для упрощения работы с JSON.

```dart
extension type AnimatedPropHelper(Map<String, dynamic> json) implements Map {
  String? get parentBuilderId => json["parentBuilderId"];

  Iterable<String>? get affectedProperties {
    if (json.containsKey("affectedProperties")) {
      return Set.from(json["affectedProperties"]);
    } else {
      return null;
    }
  }
}
```
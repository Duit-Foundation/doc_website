# ElementTree

An abstract class representing the structure of the Duit element tree. Provides methods for working with the element tree, such as parsing and rendering the tree as a widget tree.

```dart
abstract class ElementTree {
  /// The JSON object representing the DUIT element tree.
  @protected
  final Map<String, dynamic> json;

  /// The UIDriver for interacting with the UI.
  @protected
  final UIDriver driver;

  /// The root [DuitElement] of the DUIT element tree.
  ///
  /// This property holds the root [DuitElement] object of the parsed DUIT element tree.
  /// It is created during the parsing process and is used for rendering the DUIT element tree to a Flutter widget.
  late final ElementTreeEntry uiRoot;

  ElementTree({
    required this.json,
    required this.driver,
  });

  /// Parses the JSON object to create a [DuitElement] object tree.
  ///
  /// Returns a future that completes with the parsed [ElementTree] instance.
  Future<ElementTree> parse();

  /// Parses the JSON object to create a [DuitElement] object tree.
  ///
  /// Returns a future that completes with the parsed [ElementTree] instance.
  ElementTree parseSync();

  /// Renders the DUIT element tree to a Flutter widget.
  ///
  /// Returns the rendered Flutter widget.
  Widget render();
}
```

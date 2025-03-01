# CustomUiElement

A base class for creating custom widget models.

```dart
base class CustomUiElement extends DuitElement<dynamic> {
  final Iterable<ElementTreeEntry> subviews;

  CustomUiElement({
    required super.id,
    required super.controlled,
    required super.viewController,
    required super.attributes,
    required super.tag,
    this.subviews = const {},
  }) : super(
          type: ElementType.custom,
        );
}
```

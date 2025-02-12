# AnimatedPropertyOwner

Класс для расширения классов атрибутов. Добавляет необходимые свойства для изменения состояния атрибутов в ходе анимации.

```dart
base class AnimatedPropertyOwner {
  /// A set of property names that should be animated.
  final Iterable<String>? affectedProperties;

  /// ID of parent builder instance
  ///
  /// This property allows you to avoid reading animated attributes
  /// if the view refers to an incorrect inherited widget in the widget tree
  final String? parentBuilderId;

  const AnimatedPropertyOwner({
    required this.parentBuilderId,
    required this.affectedProperties,
  });
}
```

### Пример использования

```dart
final class SvgAttributes extends AnimatedPropertyOwner {
  SvgAttributes({
    String? parentBuilderId,
    Iterable<String>? affectedProperties,
  }) : super(
          parentBuilderId: parentBuilderId,
          affectedProperties: affectedProperties,
        );
}
```
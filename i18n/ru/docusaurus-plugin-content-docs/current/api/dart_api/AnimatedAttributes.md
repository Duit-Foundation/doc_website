# AnimatedAttributes

Mixin `AnimatedAttributes` отвечает за объединение анимированных свойств с атрибутами целевого виджета.

```dart
mixin AnimatedAttributes on Widget {
  /// Merges the [attributes] with the animated properties in the [DuitAnimationContext].
  T mergeWithAttributes<T>(
    BuildContext context,
    T attributes,
  ) {
    if (attributes is! AnimatedPropertyOwner) {
      return attributes;
    }

    if (attributes.parentBuilderId == null) {
      return attributes;
    }

    final animationContext = DuitAnimationContext.maybeOf(context);
    if (animationContext == null) {
      return attributes;
    }

    if (animationContext.parentId != attributes.parentBuilderId) {
      return attributes;
    }

    if (attributes.affectedProperties == null ||
        attributes.affectedProperties!.isEmpty) {
      return attributes;
    }

    final animatedProperties = <String, dynamic>{};

    for (final prop in attributes.affectedProperties!) {
      animatedProperties[prop] = animationContext.data[prop];
    }

    final dA = attributes as DuitAttributes;

    final newAttr = dA.dispatchInternalCall<DuitAttributes>(
      "fromJson",
      positionalParams: [
        animatedProperties,
      ],
    );

    return dA.copyWith(newAttr);
  }
}
```
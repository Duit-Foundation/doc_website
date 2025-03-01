# Custom Widgets - Client

## Creating a Widget Attributes Class

The attributes class for a custom widget is responsible for parsing widget properties correctly from JSON and copying them.

:::tip
You only need to implement the `dispatchInternalCall` method if the widget can work with animations.

To animate a widget using Duit, inherit your attributes class from the `AnimatedPropertyOwner` class.
:::

```dart
class SvgWidgetAttributes implements DuitAttributes<SvgWidgetAttributes> {
  final String content;
  final double? width, height;

  SvgWidgetAttributes({
    required this.content,
    this.height,
    this.width,
  });

  static SvgWidgetAttributes fromJson(Map<String, dynamic> json) {
    final w = json["width"] as num?;
    final h = json["height"] as num?;
    return SvgWidgetAttributes(
      content: json["content"] ?? "",
      height: w?.toDouble(),
      width: h?.toDouble(),
    );
  }

  @override
  SvgWidgetAttributes copyWith(other) {
    return SvgWidgetAttributes(
      content: other.content,
      height: other.height ?? height,
      width: other.width ?? width,
    );
  }

  @override
  ReturnT dispatchInternalCall<ReturnT>(String methodName, {
    Iterable? positionalParams,
    Map<String, dynamic>? namedParams,
  }) {
    return switch (methodName) {
      "fromJson" => SvgWidgetAttributes.fromJson(positionalParams!.first) as ReturnT,
      String() => throw UnimplementedError("$methodName is not implemented"),
    };
  }
}
```

## Creating a Widget Model Class

The widget model is a component of the layout's object model. It stores references to all necessary objects and metadata about the widget:

- `id` – Unique widget identifier;
- `attributes` – Widget attributes (for uncontrolled widgets);
- `viewController` – Widget controller (only for controlled widgets);
- `controlled` – Flag indicating the widget type;
- `subviews` – Child widgets (if present).

All custom widget models must inherit from the `CustomUiElement` class.

```dart
final class SvgWidget extends CustomUiElement {
  SvgWidget({
    required super.id,
    required super.attributes,
    required super.viewController,
    required super.controlled,
    required super.subviews,
  }) : super(
    tag: "SvgCustomWidget",
  );
}

```

## Attributes Factory

The attributes factory is a function that converts JSON into widget attributes. At this stage, transformations of JSON according to development needs are permissible.

```dart
DuitAttributes svgAttributeFactory(String type,
    Map<String, dynamic>? json,) {
  //your custom code for parsing json

  return SvgWidgetAttributes.fromJson(json ?? {});
}
```

## Model Factory

The model factory is a function where an instance of the widget model is created, and necessary values are passed to its constructor.

```dart
ElementTreeEntry svgModelFactory(String id,
    bool controlled,
    ViewAttribute attributes,
    UIElementController? controller, [
      Iterable<ElementTreeEntry> subviews = const {},
    ]) {
  return SvgWidget(
    id: id,
    attributes: attributes,
    viewController: controller,
    controlled: controlled,
    subviews: subviews,
  );
}
```

## Build Factory

The build factory is a function where a Flutter widget is created based on data from the widget model. To retrieve data from the model, type casting is used, converting the data either to the model type or, as shown in the example below, to the attribute type.

At this stage, child widgets are also passed to the target widget (if applicable).

```dart
Widget svgBuildFactory(ElementTreeEntry model, [
  Iterable<Widget> subviews = const {},
]) {
  final data = model.attributes?.payload as SvgWidgetAttributes;

  return SvgPicture.string(
    data.content,
    width: data.width,
    height: data.height,
  );
}
```

## Registering a Widget

Registering a widget in `DuitRegistry` is done using the `DuitRegistry.register` method, which allows embedding factory functions into the processing pipeline. **Note:** The custom widget's tag must match the tag used on the server.

```dart
DuitRegistry.register(
  "SvgCustomWidget",
  modelFactory: svgModelFactory,
  buildFactory: svgBuildFactory,
  attributesFactory: svgAttributeFactory,
);
```

# Custom Widgets - Client

## Creating a Widget Attributes Class

:::info Deprecated
Starting with the current version of Duit, developers no longer need to manually create widget attributes classes. The system automatically works with attributes through the widget controller.

Access to attributes is done through the `ViewControllerChangeListener` mixin in StatefulWidget.
:::

<details>
<summary>Old approach (not recommended)</summary>

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

</details>

## Creating a Widget Model Class

:::info Deprecated
Starting with the current version of Duit, developers no longer need to manually create widget model classes. The system automatically creates models based on the JSON structure.

The widget model class is no longer used in the new API.
:::

<details>
<summary>Old approach (not recommended)</summary>

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

</details>

## Attributes Factory

:::info Deprecated
Starting with the current version of Duit, developers no longer need to create an attributes factory. The system automatically parses attributes from JSON.

The attributes factory is no longer used in the new API.
:::

<details>
<summary>Old approach (not recommended)</summary>

The attributes factory is a function that converts JSON into widget attributes. At this stage, transformations of JSON according to development needs are permissible.

```dart
DuitAttributes svgAttributeFactory(String type,
    Map<String, dynamic>? json,) {
  //your custom code for parsing json

  return SvgWidgetAttributes.fromJson(json ?? {});
}
```

</details>

## Model Factory

:::info Deprecated
Starting with the current version of Duit, developers no longer need to create a model factory. The system automatically creates models based on the JSON structure.

The model factory is no longer used in the new API.
:::

<details>
<summary>Old approach (not recommended)</summary>

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

</details>

## Build Factory

The build factory is a function where a Flutter widget is created based on data from the widget model.

The build factory takes two parameters:

- `ElementTreeEntry model` – the widget model containing all necessary data and controller
- `Iterable<Widget> subviews` – child widgets (optional)

Access to widget data is done through the controller (`model.viewController`). To obtain attributes in a StatefulWidget, use the `ViewControllerChangeListener` mixin.

```dart
Widget svgBuildFactory(
  ElementTreeEntry model, [
  Iterable<Widget> subviews = const {},
]) {
  // Creating widget with controller
  return SvgPictureWidget(
    controller: model.viewController,
    child: subviews.isEmpty ? null : subviews.first,
  );
}

class SvgPictureWidget extends StatefulWidget {
  final UIElementController controller;
  final Widget? child;

  const SvgPictureWidget({
    required this.controller,
    this.child,
  });

  @override
  State<SvgPictureWidget> createState() => _SvgPictureWidgetState();
}

class _SvgPictureWidgetState extends State<SvgPictureWidget>
    with ViewControllerChangeListener {
  @override
  void initState() {
    // Connecting to controller to receive updates
    attachStateToController(widget.controller);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    // Getting data from attributes
    final content = attributes.getString(key: "content") ?? "";
    final width = attributes.getDouble(key: "width");
    final height = attributes.getDouble(key: "height");

    return SvgPicture.string(
      content,
      width: width,
      height: height,
      child: widget.child,
    );
  }
}
```

## Registering a Widget

Registering a widget in `DuitRegistry` is done using the `DuitRegistry.register` method, which allows embedding a build factory into the processing pipeline. **Note:** The custom widget's tag must match the tag used on the server.

```dart
DuitRegistry.register(
  "SvgCustomWidget",
  buildFactory: svgBuildFactory,
);
```

:::note
The `modelFactory` and `attributesFactory` methods are no longer used in the current API. The system automatically determines attribute and model types based on the JSON structure.
:::

# Managing UI State

In Duit, managing UI state revolves around three core components: controlled widgets, actions, and events. Controlled widgets are a concept for externally controlling UI state by explicitly indicating which widgets can be modified.

## Why is this necessary?

Controlled widgets are built on top of StatefulWidgets and leverage the State lifecycle to implement the state update mechanism. Indiscriminately creating all widgets as Stateful introduces unnecessary overhead by generating and storing multiple State objects that we'll never use.

Separating widgets and explicitly marking whether they can be updated externally is a necessary optimization to conserve system resources.

## Structure of Duit Widgets

A Duit widget acts as a wrapper around a specific Flutter widget. When processing a layout, it can produce one of two widget variants:
either controlled or uncontrolled. This distinction depends on the value of the `controlled` field in the element's model. This wrapper facilitates proper parameter transfer to the widget and manages the internal state of controlled widgets.

A typical widget model looks like this:

```json
{
  "type": "Text",
  "controlled": true,
  "id": "text_1",
  "attributes": {
    "data": "Hello"
  }
}
```

Certain widgets are inherently controlled by default since they handle user input, dynamically fetch data for rendering, or simply perform related actions.

- ElevatedButton
- ListView.builder & ListView.separated
- Checkbox
- Component
- GestureDetector
- LifecycleStateListener
- Meta
- Radio
- Subtree
- Slider
- Switch
- TextField
- AnimationBuilder

Another significant difference between the two widget types lies in how they acquire data for constructing the mapped widget. Controlled widgets do not directly derive data from element attributes; instead, they rely on a controller associated with the widget. Through this controller, managed state control and user interaction handling—via actions linked to UI elements—are implemented.

```dart
// Simple widget variant
final class DuitText extends StatelessWidget with AnimatedAttributes {
  final ViewAttribute attributes;

//other code
}

/// Controlled variant
final class DuitControlledText extends StatefulWidget with AnimatedAttributes {
  final UIElementController controller;

//other code
}
```

## Controller

Controllers are objects that implement the `UIElementController` interface. They facilitate bidirectional communication between the driver and widgets, assist in action processing, and manage widget state updates.

When creating a new controlled widget, Duit subscribes the widget to changes in the controller's attributes.

Upon receiving a new event, such as an `update` event, the driver locates the appropriate controller and invokes the method responsible for refreshing the widget's current attributes. Afterward, the controller notifies the widget that its attributes have been externally altered and that it needs to rebuild itself.

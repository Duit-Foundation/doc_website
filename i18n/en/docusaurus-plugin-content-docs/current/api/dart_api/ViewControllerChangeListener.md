# ViewControllerChangeListener

The `ViewControllerChangeListener` mixin tracks changes in the user interface element's controller and appropriately updates the widget's state.

`ViewControllerChangeListener` should be used with `StatefulWidget` and its associated `State` class. It provides a mechanism for attaching `State` to `UIElementController` and listening for updates in the controller's attributes. When the controller is updated, `ViewControllerChangeListener` triggers a state update, allowing the user interface to reflect the new attribute values.

:::info
Event listener removal and unlinking from the driver occur automatically when the `dispose` method is called in `State`.
:::

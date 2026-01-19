# DuitDriver

:::danger Deprecated
The `DuitDriver` class is marked as deprecated and will be removed in the next major release.

Use [XDriver](/docs/api/dart_api/XDriver) instead.
:::

Implementation of [UIDriver](/docs/api/dart_api/UIDriver). It is a crucial part of the Duit-presentation and coordinates the operation of all framework components: transport configuration, action execution, event handling, parsing, and rendering of UI elements.

:::tip
The `DuitDriver` instance is used in conjunction with [DuitViewHost](/docs/api/dart_api/DuitViewHost), which initializes the driver and subscribes to widget tree updates.

You can implement DuitViewHost functionality yourself to meet specific widget requirements.
:::

Provides constructors tailored to specific development tasks:

- **default** for implementing the classic workflow (initial layout request and rendering)
- **static** for passing a layout to the constructor
- **module** for using Duit as a BDUI engine in native applications

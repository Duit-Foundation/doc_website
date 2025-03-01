# About Custom Widgets

## What Is the Problem?

The Flutter ecosystem offers ready-made solutions for almost any situation. Many packages published on pub.dev export various widgets as part of their composition. Duit advocates a dependency-free development approach, minimizing reliance on external dependencies within the framework. Thus, widgets from open-source libraries cannot be included in the Duit library. Moreover, doing so would demand considerable effort for ongoing support.

Conversely, there's a requirement to support already developed widgets (e.g., using widgets from a UI kit) alongside Duit, including transferring configuration data for these widgets.

## What's the Solution?

Duit provides an API for creating and registering special factory functions, allowing users to embed their own widget implementations into the processing pipeline. Custom widget registration is achieved using the static method `DuitRegistry.register` of the `DuitRegistry` class.

:::info
A registered widget will be globally accessible to all instances of `DuitDriver` initialized within the application.
:::

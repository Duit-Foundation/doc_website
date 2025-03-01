# The duit_kernel Package

The flutter_duit library depends on the [duit_kernel](https://github.com/Duit-Foundation/duit_kernel) package. It contains fundamental interfaces and classes that standardize the implementation of core framework elements. This package addresses several critical challenges:

- Separates interfaces from implementations for more flexible development.
- Provides the ability to create custom framework implementations within predefined contracts.
- Enables writing custom framework extensions without requiring a direct dependency on flutter_duit. [Example](https://github.com/Duit-Foundation/duit_hetu_extension).

Splitting the framework into two libraries, each updated for different reasons, results in a more stable design.

:::info
Starting from version v3.0.0 of the duit_kernel package, entities required by the client side are exported by the flutter_duit package. This eliminates the need to manually add kernel to your project's dependencies.
:::
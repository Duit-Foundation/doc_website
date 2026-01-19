# ExternalEventHandler

:::danger Deprecated
The `ExternalEventHandler` class is marked as deprecated and will be removed in the next major release.

Use the `attachExternalHandler` method in [XDriver](/docs/api/dart_api/XDriver) with [UserDefinedHandlerKind](/docs/api/dart_api/UserDefinedHandlerKind) instead.
:::

An interface that defines a set of methods for handling special event types, such as `CustomEvent`, `NavigationEvent`, and `OpenUrlEvent`.

```dart
abstract interface class ExternalEventHandler {
  FutureOr<void> handleNavigation(
    BuildContext context,
    String path,
    Object? extra,
  );

  FutureOr<void> handleOpenUrl(String url);

  FutureOr<void> handleCustomEvent(
    BuildContext context,
    String key,
    Object? extra,
  );
}
```

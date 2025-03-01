# ExternalEventHandler

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

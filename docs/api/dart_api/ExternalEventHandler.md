# ExternalEventHandler

Интерфейс, определяющий набор методов для обработки специальных типов событий, таких как `CustomEvent`, `NavigationEvent` и `OpenUrlEvent`.

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
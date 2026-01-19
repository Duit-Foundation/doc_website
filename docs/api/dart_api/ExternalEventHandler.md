# ExternalEventHandler

:::danger Deprecated
Класс `ExternalEventHandler` помечен как deprecated и будет удален в следующем мажорном релизе.

Используйте метод `attachExternalHandler` в [XDriver](/docs/api/dart_api/XDriver) с типом [UserDefinedHandlerKind](/docs/api/dart_api/UserDefinedHandlerKind) вместо него.
:::

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
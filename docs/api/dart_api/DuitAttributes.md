# DuitAttributes

Интерфейс атрибутов. От него наследуются классы всех атрибутов Duit. Предоставляет методы для работы с атрибутами.

```dart
abstract interface class DuitAttributes<T> {
  /// Creates a copy of an attribute object with updated values.
  T copyWith(T other);

  ///Implementing a method in descendant classes allows
  ///you to call private methods or methods not included
  ///in the common interface
  ReturnT dispatchInternalCall<ReturnT>(
    String methodName, {
    Iterable<dynamic>? positionalParams,
    Map<String, dynamic>? namedParams,
  });
}
```
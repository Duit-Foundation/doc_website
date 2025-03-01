# DuitAttributes

The attributes interface. All Duit attribute classes inherit from it. Provides methods for working with attributes.

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
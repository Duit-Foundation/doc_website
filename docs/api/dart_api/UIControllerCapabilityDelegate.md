# UIControllerCapabilityDelegate

Миксин, предоставляющий интерфейс для управления UI-контроллерами элементов в драйвере Duit.

Классы, использующие этот делегат, должны реализовать логику для отслеживания, привязки, отвязки и обновления UI-контроллеров.

## Методы

### attachController

```dart
void attachController(String id, UIElementController controller);
```

Привязывает UI-контроллер к драйверу.

Вызывается при создании нового UI-элемента или интерактивного виджета, который должен отслеживаться драйвером.

**Параметры:**
- `id` — уникальный идентификатор контроллера
- `controller` — экземпляр [UIElementController](/docs/api/dart_api/UIElementController)

### detachController

```dart
void detachController(String id);
```

Отвязывает UI-контроллер с указанным идентификатором.

Вызывается при удалении UI-элемента, чтобы предотвратить утечки памяти.

### getController

```dart
UIElementController? getController(String id);
```

Возвращает [UIElementController](/docs/api/dart_api/UIElementController), связанный с указанным идентификатором, или `null`.

### updateAttributes

```dart
Future<void> updateAttributes(
  String controllerId,
  Map<String, dynamic> json,
);
```

Обновляет атрибуты UI-контроллера с указанным идентификатором.

**Параметры:**
- `controllerId` — идентификатор контроллера
- `json` — карта ключ-значение с атрибутами для обновления

### controllersCount

```dart
int get controllersCount;
```

Возвращает количество привязанных к делегату контроллеров.

Полезно для диагностики и отладки.

### releaseResources

```dart
void releaseResources();
```

Освобождает ресурсы делегата.

## Типичные обязанности

- Сопоставление идентификаторов контроллеров с их активными экземплярами
- Динамическая привязка/отвязка контроллеров при построении или удалении UI
- Применение обновлений состояния и атрибутов от сервера
- Предоставление методов для запроса или перечисления привязанных контроллеров

## Пример реализации

```dart
final class MyControllerManager with UIControllerCapabilityDelegate {
  final _controllers = <String, UIElementController>{};

  @override
  void attachController(String id, UIElementController controller) {
    _controllers[id] = controller;
  }

  @override
  void detachController(String id) {
    _controllers.remove(id)?.dispose();
  }

  @override
  UIElementController? getController(String id) => _controllers[id];

  @override
  Future<void> updateAttributes(
    String controllerId,
    Map<String, dynamic> json,
  ) async {
    _controllers[controllerId]?.updateState(json);
  }

  @override
  int get controllersCount => _controllers.length;

  @override
  void releaseResources() {
    for (final controller in _controllers.values) {
      controller.dispose();
    }
    _controllers.clear();
  }
}
```

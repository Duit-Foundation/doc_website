# FocusCapabilityDelegate

Миксин, предоставляющий интерфейс для управления фокусом UI-элементов в системе Duit.

Классы, использующие этот делегат, должны реализовать методы для работы с `FocusNode` — запрос фокуса, навигация между элементами и управление состоянием фокуса.

## Методы

### requestFocus

```dart
void requestFocus(String nodeId);
```

Запрашивает перемещение фокуса к `FocusNode`, связанному с указанным `nodeId`.

### nextFocus

```dart
bool nextFocus(String nodeId);
```

Перемещает фокус к следующему фокусируемому узлу в порядке обхода.

**Возвращает:** `true`, если фокус был успешно перемещен.

### previousFocus

```dart
bool previousFocus(String nodeId);
```

Перемещает фокус к предыдущему фокусируемому узлу.

**Возвращает:** `true`, если фокус был успешно перемещен.

### unfocus

```dart
void unfocus(
  String nodeId, {
  UnfocusDisposition disposition = UnfocusDisposition.scope,
});
```

Снимает фокус с указанного узла.

**Параметры:**
- `nodeId` — идентификатор узла
- `disposition` — способ обработки фокуса при снятии

### focusInDirection

```dart
bool focusInDirection(String nodeId, TraversalDirection direction);
```

Перемещает фокус в указанном направлении (вверх, вниз, влево, вправо).

### attachFocusNode

```dart
void attachFocusNode(String nodeId, FocusNode node);
```

Привязывает `FocusNode` к делегату с указанным идентификатором.

### detachFocusNode

```dart
void detachFocusNode(String nodeId);
```

Отвязывает `FocusNode` с указанным идентификатором.

### getNode

```dart
FocusNode? getNode(Object? key);
```

Возвращает `FocusNode`, связанный с указанным ключом.

### releaseResources

```dart
void releaseResources();
```

Освобождает ресурсы делегата.

## Пример использования

```dart
final class MyFocusManager with FocusCapabilityDelegate {
  final _nodes = <String, FocusNode>{};

  @override
  void attachFocusNode(String nodeId, FocusNode node) {
    _nodes[nodeId] = node;
  }

  @override
  void detachFocusNode(String nodeId) {
    _nodes.remove(nodeId);
  }

  @override
  void requestFocus(String nodeId) {
    _nodes[nodeId]?.requestFocus();
  }

  @override
  FocusNode? getNode(Object? key) => _nodes[key];

  // ... остальные методы
}
```

:::tip
Управление фокусом особенно важно для обеспечения доступности (accessibility) и поддержки клавиатурной навигации в приложениях.
:::

## См. также

- [Flutter Focus cookbook](https://docs.flutter.dev/cookbook/forms/focus)
- [FocusNode API](https://api.flutter.dev/flutter/widgets/FocusNode-class.html)

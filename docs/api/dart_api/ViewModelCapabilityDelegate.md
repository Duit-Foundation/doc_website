# ViewModelCapabilityDelegate

Миксин, предоставляющий возможности для управления и взаимодействия с представлениями (views) в системе Duit UI.

Позволяет классам взаимодействовать с драйверами, реагировать на UI-события и управлять жизненным циклом представлений.

## Методы

### eventStream

```dart
Stream<UIDriverEvent> get eventStream;
```

Поток событий драйвера (`UIDriverEvent`), которыми управляет делегат.

Используется для прослушивания событий драйвера и обновления состояния в ответ.

### buildContext

```dart
BuildContext get buildContext;
```

Текущий `BuildContext`, связанный с драйвером.

### context (setter)

```dart
set context(BuildContext value);
```

Устанавливает текущий `BuildContext` для делегата.

### addUIDriverEvent

```dart
void addUIDriverEvent(UIDriverEvent event);
```

Добавляет событие `UIDriverEvent` в поток событий.

### addUIDriverError

```dart
void addUIDriverError(Object error, [StackTrace? stackTrace]);
```

Сообщает об ошибке, произошедшей в контексте драйвера.

### notifyWidgetDisplayStateChanged

```dart
void notifyWidgetDisplayStateChanged(String viewTag, int state);
```

Уведомляет драйвер об изменении состояния отображения виджета.

**Параметры:**
- `viewTag` — тег виджета
- `state` — новое состояние (0 = не видим, 1 = видим и отображен)

### isWidgetReady

```dart
bool isWidgetReady(String viewTag);
```

Проверяет, готов ли виджет к отображению.

### prepareLayout

```dart
Future<DuitView?> prepareLayout(Map<String, dynamic> json);
```

Подготавливает и валидирует конфигурацию layout из JSON, возвращая экземпляр `DuitView`.

**Параметры:**
- `json` — структура layout (виджеты, свойства, отношения)

**Возвращает:** `DuitView` для дальнейшего использования или `null` при невалидном layout.

### currentView

```dart
DuitView? get currentView;
```

Возвращает текущее отображаемое представление.

### releaseResources

```dart
void releaseResources();
```

Освобождает ресурсы делегата.

## Пример использования

```dart
final class MyViewManager with ViewModelCapabilityDelegate {
  final _eventController = StreamController<UIDriverEvent>.broadcast();
  BuildContext? _context;
  DuitView? _currentView;

  @override
  Stream<UIDriverEvent> get eventStream => _eventController.stream;

  @override
  BuildContext get buildContext => _context!;

  @override
  set context(BuildContext value) => _context = value;

  @override
  void addUIDriverEvent(UIDriverEvent event) {
    _eventController.add(event);
  }

  @override
  void addUIDriverError(Object error, [StackTrace? stackTrace]) {
    _eventController.addError(error, stackTrace);
  }

  @override
  Future<DuitView?> prepareLayout(Map<String, dynamic> json) async {
    // Парсинг и подготовка layout
    return _currentView;
  }

  @override
  DuitView? get currentView => _currentView;

  @override
  void releaseResources() {
    _eventController.close();
  }

  // ... остальные методы
}
```

# StubTransportManager

Заглушка для транспортного менеджера.

Реализует [TransportCapabilityDelegate](/docs/api/dart_api/TransportCapabilityDelegate) как пустую реализацию, которая не выполняет никаких сетевых операций. Используется при работе со статическим контентом или в тестовых сценариях.

## Конструктор

```dart
StubTransportManager();
```

## Особенности

- Все методы логируют предупреждение о том, что они не реализованы
- Возвращает пустые данные для всех запросов
- При вызове `connect` со статическим контентом возвращает этот контент

## Пример использования

### Автоматическое использование

`StubTransportManager` автоматически используется при создании драйвера в статическом режиме:

```dart
final driver = XDriver.static({
  'type': 'Column',
  'children': [
    {'type': 'Text', 'data': 'Hello World'},
  ],
});
// Внутри используется StubTransportManager
```

### Явное использование

```dart
final driver = XDriver.static(
  content,
  transportManager: StubTransportManager(),
);
```

## Методы

Все методы `TransportCapabilityDelegate` реализованы, но:
- `executeRemoteAction` — логирует предупреждение, возвращает пустой `Map`
- `request` — логирует предупреждение, возвращает пустой `Map`
- `connect` — возвращает переданный `staticContent` или пустой `Map`

:::tip
Используйте `StubTransportManager` для тестирования UI без необходимости настройки серверной части.
:::

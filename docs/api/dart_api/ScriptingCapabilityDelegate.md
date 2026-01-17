# ScriptingCapabilityDelegate

Миксин, предоставляющий возможности для управления и запуска скриптов в системе Duit UI.

Классы, использующие этот делегат, должны реализовать методы для выполнения, интерпретации и инициализации скриптов.

## Методы

### evalScript

```dart
Future<void> evalScript(String source);
```

Интерпретирует исходный код скрипта и запускает его компиляцию/интерпретацию.

**Параметры:**
- `source` — исходный код скрипта

### execScript

```dart
Future<Map<String, dynamic>?> execScript(
  String functionName, {
  String? url,
  Map<String, dynamic>? meta,
  Map<String, dynamic>? body,
});
```

На основе имени функции запускает её выполнение.

**Параметры:**
- `functionName` — имя функции для выполнения
- `url` — URL для работы с транспортом (опционально)
- `meta` — метаданные (опционально)
- `body` — данные для передачи скрипту (опционально)

### initScriptingCapability

```dart
Future<void> initScriptingCapability();
```

Инициализирует возможности скриптинга.

### releaseResources

```dart
void releaseResources();
```

Освобождает ресурсы делегата.

## Пример реализации

```dart
final class MyScriptRunner with ScriptingCapabilityDelegate {
  late final ScriptEngine _engine;

  @override
  Future<void> initScriptingCapability() async {
    _engine = await ScriptEngine.create();
  }

  @override
  Future<void> evalScript(String source) async {
    await _engine.evaluate(source);
  }

  @override
  Future<Map<String, dynamic>?> execScript(
    String functionName, {
    String? url,
    Map<String, dynamic>? meta,
    Map<String, dynamic>? body,
  }) async {
    return await _engine.callFunction(
      functionName,
      arguments: {
        'url': url,
        'meta': meta,
        'body': body,
      },
    );
  }

  @override
  void releaseResources() {
    _engine.dispose();
  }
}
```

## Использование с XDriver

```dart
final driver = XDriver.remote(
  transportManager: HttpTransportManager(...),
  scriptingManager: MyScriptRunner(),
);
```

:::tip
Подробнее об использовании скриптинга можно узнать в разделе [Скриптинг](/docs/advanced_tech/scripting).
:::

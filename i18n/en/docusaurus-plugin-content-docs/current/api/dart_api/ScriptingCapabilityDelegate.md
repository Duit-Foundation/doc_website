# ScriptingCapabilityDelegate

A mixin that provides capabilities for managing and running scripts in the Duit UI system.

Classes using this delegate must implement methods for executing, interpreting, and initializing scripts.

## Methods

### evalScript

```dart
Future<void> evalScript(String source);
```

Interprets script source code and starts compilation/interpretation.

**Parameters:**
- `source` — script source code

### execScript

```dart
Future<Map<String, dynamic>?> execScript(
  String functionName, {
  String? url,
  Map<String, dynamic>? meta,
  Map<String, dynamic>? body,
});
```

Starts execution based on function name.

**Parameters:**
- `functionName` — function name to execute
- `url` — URL for working with transport (optional)
- `meta` — metadata (optional)
- `body` — data to pass to the script (optional)

### initScriptingCapability

```dart
Future<void> initScriptingCapability();
```

Initializes scripting capabilities.

### releaseResources

```dart
void releaseResources();
```

Releases delegate resources.

## Implementation Example

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

## Using with XDriver

```dart
final driver = XDriver.remote(
  transportManager: HttpTransportManager(...),
  scriptingManager: MyScriptRunner(),
);
```

:::tip
Learn more about scripting in the [Scripting](/docs/advanced_tech/scripting) section.
:::

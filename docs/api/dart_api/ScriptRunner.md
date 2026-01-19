# ScriptRunner

:::danger Deprecated
Класс `ScriptRunner` помечен как deprecated и будет удален в следующем мажорном релизе.

Используйте [ScriptingCapabilityDelegate](/docs/api/dart_api/ScriptingCapabilityDelegate) вместо него.
:::

Интерфейс для создания классов, отвечающих за обработку и запуск динамических скриптов в интегрированной среде выполения.

```dart
abstract base class ScriptRunner<TOptions> {
  ///The script runner options
  final TOptions runnerOptions;

  ScriptRunner({
    required this.runnerOptions,
  });

  ///Based on the name of the function, starts its execution.
  ///
  ///Accepts additional parameters [url], [meta], [body],
  ///necessary for working with the transport object,
  ///as well as for passing data to the executing script
  Future<Map<String, dynamic>?> runScript(
    String functionName, {
    String? url,
    Map<String, dynamic>? meta,
    Map<String, dynamic>? body,
  });

  ///The method is intended to evaluate the source code of the script and start compilation/interpretation.
  Future<void> eval(String sourceCode);

  ///Script runner initialization method. Takes a reference to a Transport object as its only parameter.
  Future<void> initWithTransport(Transport transport);
}
```

:::tip
Подробнее об использовании `ScriptRunner` можно узнать в соотвествующем [разделе](/docs/advanced_tech/scripting).
:::
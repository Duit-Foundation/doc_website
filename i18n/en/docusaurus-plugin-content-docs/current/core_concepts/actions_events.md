# Actions and Events

One crucial aspect of any application is processing user actions and responding accordingly in the user interface (UI).

Duit provides a powerful and extensible event-oriented API that allows defining structures on the server to specify how the framework should react to user interactions with UI elements and how the interface should change as a result. This functionality is handled by the Action & Event API.

## Actions

An action is a structure defined on the server that describes what should happen after an interaction.

In Duit, there are three main types of actions, distinguished by how they are processed and which framework mechanisms are involved.

### TransportAction

TransportAction — actions that engage the [transport layer](core_concepts/transport_layer.md) of Duit. An action definition includes the name of the server-side endpoint to be accessed during execution, a list of action dependencies, and optionally additional data (HttpActionMetainfo).

```json
{
    "executionType": 0 // 0 - transport, 1 - local, 2 - script
    "dependsOn": [
        {"tagret": "key_in_obj", "id":"id1"}
        {"tagret": "key_in_ob2j", "id":"id2"}
    ],
    "event": "/some/endpoint",
    "meta": {
        "method": "POST",
    },
}
```

### LocalAction

Local actions instantly perform associated events or groups of events. They are useful when you need to update the UI state without requiring server communication.

```json
{
    "executionType": 1 // 0 - transport, 1 - local, 2 - script
    "event": {...}, //related event
}
```

### ScriptAction

A special type of action that includes a dynamic script in its definition, which will be executed in the integrated runtime environment. Read more about using scripts in the corresponding documentation [section](advanced_tech/scripting.mdx).

```json
{
    "executionType": 2 // 0 - transport, 1 - local, 2 - script
    "dependsOn": [
        {"tagret": "key_in_obj", "id":"id1"}
        {"tagret": "key_in_ob2j", "id":"id2"}
    ],
    "script": {
        "sourceCode": "fun test() {...}", //script text
        "functionName": "test", //function to call
        "meta": {...} //additional info
    }
}
```

## Action Execution Options

Duit provides the ability to control the frequency of action execution through the `ExecutionOptions` mechanism. This is particularly useful for preventing excessive server requests and improving user experience.

### ExecutionOptions

Action execution options support two modifiers:

- **`throttle`** - Limits the frequency of action execution. The action will execute at most once per specified time period. Subsequent calls within the period will be ignored.
- **`debounce`** - Delays action execution until after a quiet period. Execution is delayed until the specified duration has passed without new calls.

```json
{
    "executionType": 0,
    "dependsOn": [...],
    "event": "/some/endpoint",
    "meta": {
        "method": "POST"
    },
    "executionOptions": {
        "modifier": "throttle",
        "duration": 500
    }
}
```

Example for debounce:

```json
{
    "executionType": 0,
    "event": "/search",
    "executionOptions": {
        "modifier": "debounce",
        "duration": 300
    }
}
```

## Action Dependencies

During application usage, users may interact with UI elements such as TextFields, CheckBoxes, Radios, etc. Interacting with these elements often involves collecting and utilizing data entered by the user.

To handle such cases, `TransportAction` and `ScriptAction` possess a `dependsOn` property, which is a list of objects in the form `{"target": "key_in_obj", "id": "id1"}` (where `target` refers to the resulting object's property key, and `id` is the controlled widget's identifier). These objects represent data that needs to be gathered and used during action execution.

When an action with declared dependencies is performed, Duit attempts to access controllers for these elements to retrieve their current attribute values. Attribute classes capable of changing stored values during runtime and providing getters for retrieval inherit from the `AttendedModel<T>` class. An example is the [TextFieldAttributes](https://github.com/Duit-Foundation/flutter_duit/blob/main/lib/src/attributes/text_field_attrs.dart) class.

Based on the dependency list, a resultant object containing the collected data is constructed. This object is then passed to the transport layer, which prepares it for transmission. For instance, in an HTTP GET request, the object might be converted into query parameters and appended to the request URL, whereas in a POST request, it would be added to the request body.

This mechanism enables developers to implement forms whose data can be submitted to the server during action execution.

## Events

Events are outcomes of actions that describe the UI's behavior post-action completion. Duit supports various types of events, each of which is detailed below:

### UpdateEvent

UpdateEvent handles updating controlled UI elements. Its description includes an `updates` object where keys correspond to controlled widget IDs (used to locate and employ the relevant controller), and values represent new widget attributes.

```json
{
  "type": "update",
  "updates": {
    "text_1": {
      "data": "New text",
      // "color": "#DCDCDC" сan`t be handled
      "style": {
        "color": "#DCDCDC"
      }
    }
  }
}
```

:::warning
Parsing new attributes does not support "flat" values. If a property is compound (e.g., TextStyle), it must replicate the original class structure.
:::

### CommandEvent

An event that sends a command to a controller for executing special operations. Commands allow the server to directly interact with widget controllers, triggering specific behaviors.

```json
{
  "type": "command",
  "controllerId": "some_id",
  "type": "animation",
  "commandData": {
    "animatedPropKey": "style",
    "method": 0, // 0 - forward, 1 - repeat, 2 - reverse, 3 - toggle
    "trigger": "auto" // auto, manual
  }
}
```

Commands support several types:

- **`animation`** - Controls property animations
- **`bottomSheet`** - Shows/hides modal bottom sheets
- **`dialog`** - Shows/hides dialog windows

Example command for showing a BottomSheet:

```json
{
  "type": "command",
  "controllerId": "overlay",
  "type": "bottomSheet",
  "commandData": {
    "action": "open",
    "content": {...},
    "isScrollControlled": true,
    "isDismissible": true
  }
}
```

### TimerEvent

An event that will be triggered upon timer expiration. The description includes nested events or event groups and the timer duration.

```json
{
    "type": "timer",
    "timerDelay": 1000, // in ms
    "event": {...}, //nested event
}
```

### SequencedEventGroup

A group of events that allows sequential execution of nested events with a specified interval.

```json
{
    "type": "sequenced",
    "delay": 1000, // in ms
    "events": [
        {...}, //event 1
        {...}, //event 2
        {...}, //event 3
    ], //nested events
}
```

### CommonEventGroup

A group of events that allows executing nested events.

```json
{
    "type": "grouped",
    "events": [
        {...}, //event 1
        {...}, //event 2
        {...}, //event 3
    ], //nested events
}
```

:::warning
Execution order of actions is not guaranteed!
:::

### NavigationEvent, OpenUrlEvent, and CustomEvent

These events are grouped together because handling them requires passing an implementation of the `ExternalEventHandler` interface to the `DuitDriver` constructor.

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

NavigationEvent - An event processed by the `handleNavigation` method, applied when transitioning to another non-Duit screen within the application is required.

OpenUrlEvent - An event processed by the `handleOpenUrl` method, intended for opening external links in the device's browser.

CustomEvent - A specialized event type enabling handling of unforeseen events. Useful in hybrid integrations involving Duit and other parts of the application.

### NullEvent

A service event returned by the event parser when the event object cannot be properly processed.

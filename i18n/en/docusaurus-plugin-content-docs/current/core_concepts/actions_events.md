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

### Idempotent Action Execution

For `TransportAction` and `ScriptAction`, Duit supports idempotent execution. When idempotency is enabled, repeated invocations with identical input data (from `dependsOn`) are suppressed — no request is sent to the server.

A hash cache is used: on each invocation, a hash of the dependency data is computed. If the hash matches the last successful execution, the action is not executed.

Parameters:

- **`idempotent`** (bool) — enables idempotent execution mode. Default is `false`.
- **`suppressionTTL`** (int, milliseconds) — optional. Time after which re-execution with the same data is allowed. If not specified, duplicate suppression lasts indefinitely (until the data changes).

:::tip
Use idempotency to avoid redundant requests on rapid button taps or when multiple widgets trigger the same action with identical data.
:::

```json
{
    "executionType": 0,
    "dependsOn": [{"target": "query", "id": "search_input"}],
    "event": "/api/search",
    "idempotent": true,
    "suppressionTTL": 5000
}
```

In the example above, the action will not be executed again with the same search text within 5 seconds of the last execution.

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

Base CommandEvent structure:

```json
{
  "type": "command",
  "controllerId": "widget_id",
  "commandData": {
    "type": "animation",
    // ... type-specific command data
  }
}
```

#### Supported Command Types

| Type | Description | API Reference |
|------|-------------|---------------|
| `animation` | Property animation control | [AnimationCommand](/docs/api/dart_api/AnimationCommand) |
| `bottomSheet` | Show/hide modal bottom sheets | [BottomSheetCommand](/docs/api/dart_api/BottomSheetCommand) |
| `dialog` | Show/hide dialog windows | [DialogCommand](/docs/api/dart_api/DialogCommand) |
| `pageView` | PageView/PageController management | [PageViewCommand](/docs/api/dart_api/PageViewCommand) |
| `focusNode` | Focus management for elements | [FocusNodeCommand](/docs/api/dart_api/FocusNodeCommand) |

#### Animation Command

```json
{
  "type": "command",
  "controllerId": "animated_widget_id",
  "commandData": {
    "type": "animation",
    "animatedPropKey": "style",
    "method": 0,
    "trigger": "onAction"
  }
}
```

Parameters:

- `animatedPropKey` - key of the animated property
- `method` - animation method: `0` (forward), `1` (repeat), `2` (reverse), `3` (toggle)
- `trigger` - trigger: `onEnter` (when entering screen) or `onAction` (on action)

#### BottomSheet Command

```json
{
  "type": "command",
  "controllerId": "overlay",
  "commandData": {
    "type": "bottomSheet",
    "action": "open",
    "content": {...},
    "isScrollControlled": true,
    "isDismissible": true,
    "enableDrag": true,
    "showDragHandle": true,
    "backgroundColor": "#FFFFFF"
  }
}
```

Parameters:

- `action` - action: `open` or `close`
- `content` - content (widget tree)
- `isScrollControlled`, `isDismissible`, `enableDrag` - behavior settings
- `onClose` - action on close

#### Dialog Command

```json
{
  "type": "command",
  "controllerId": "overlay",
  "commandData": {
    "type": "dialog",
    "action": "open",
    "content": {...},
    "barrierDismissible": true,
    "useSafeArea": true
  }
}
```

#### PageView Command

```json
{
  "type": "command",
  "controllerId": "page_view_id",
  "commandData": {
    "type": "pageView",
    "action": "animateToPage",
    "page": 2,
    "duration": 300,
    "curve": "easeInOut"
  }
}
```

Supported actions:

- `nextPage`, `previousPage` - navigate between pages
- `animateToPage`, `animateTo` - animated navigation
- `jumpToPage`, `jumpTo` - instant navigation

#### FocusNode Command

```json
{
  "type": "command",
  "controllerId": "text_field_id",
  "commandData": {
    "type": "focusNode",
    "action": "requestFocus"
  }
}
```

Supported actions:

- `requestFocus` - request focus
- `unfocus` - remove focus
- `nextFocus`, `previousFocus` - navigate between elements
- `focusInDirection` - navigate in direction (`up`, `down`, `left`, `right`)

:::info
For detailed information about each command type, see the [API Reference](/docs/api/dart_api/RemoteCommand).
:::

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

These events require the registration of external handlers via the driver's `attachExternalHandler` method. Instead of using the `ExternalEventHandler` interface, Duit now uses a mechanism for registering individual handlers for each event type.

The `UserDefinedHandlerKind` enum is used to specify the event type:

- `navigation` — for navigation events (`NavigationEvent`).
- `openUrl` — for opening external links (`OpenUrlEvent`).
- `custom` — for custom user events (`CustomEvent`).

All handlers must match the `UserDefinedEventHandler` signature:

```dart
typedef UserDefinedEventHandler = FutureOr<void> Function(
  BuildContext context,
  String path,
  Object? extra,
);
```

Example of registering handlers:

```dart
driver.attachExternalHandler(
  UserDefinedHandlerKind.navigation,
  (context, path, extra) {
    // Logic for navigating to another screen
  },
);

driver.attachExternalHandler(
  UserDefinedHandlerKind.openUrl,
  (context, url, _) {
    // Logic for opening a URL
  },
);
```

**NavigationEvent** — used when a transition to another non-Duit screen within the application is required.

**OpenUrlEvent** — intended for opening external links in the device's browser.

**CustomEvent** — a specialized event type enabling the handling of unforeseen events. Useful in hybrid integrations involving Duit and other parts of the application.

### External Event Streams

Duit allows integrating external event sources (e.g., WebSockets, Firebase, or native platform events) into the driver's event handling system. Events from these streams will be automatically processed by the driver and can trigger UI updates or the execution of registered handlers.

To add a stream, use the `addExternalEventStream` method:

```dart
final websocketStream = WebSocketChannel.connect(
  Uri.parse('ws://example.com'),
).stream.map((data) => jsonDecode(data) as Map<String, dynamic>);

driver.addExternalEventStream(websocketStream);
```

**Key Features:**

- The driver automatically subscribes to the stream when added and cancels the subscription when `dispose` is called.
- You can add multiple streams; they will be processed in parallel.
- The structure of events in the stream must match the expected Duit format or be handled by registered external handlers.

### NullEvent

A service event returned by the event parser when the event object cannot be properly processed.

## Remote Command System (RemoteCommand)

The remote command system is a mechanism that allows the server to directly control widget behavior through controllers. Unlike `UpdateEvent`, which updates widget attributes, commands trigger specific behaviors: starting animations, managing PageView navigation, controlling focus, displaying modal windows, and other operations.

### Architecture

```
┌─────────────┐      ┌──────────────┐      ┌─────────────────────┐      ┌────────────┐
│   Server    │ ───▶ │ CommandEvent │ ───▶ │ UIElementController │ ───▶ │   Widget   │
└─────────────┘      └──────────────┘      └─────────────────────┘      └────────────┘
                            │
                            ▼
                     ┌──────────────┐
                     │ RemoteCommand│
                     │   (base)     │
                     └──────────────┘
                            │
          ┌─────────────────┼─────────────────┐
          ▼                 ▼                 ▼
   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
   │ Animation    │  │ BottomSheet  │  │ PageView     │
   │ Command      │  │ Command      │  │ Command      │
   └──────────────┘  └──────────────┘  └──────────────┘
```

### Base RemoteCommand Class

All commands inherit from the base `RemoteCommand` class:

```dart
base class RemoteCommand {
  final String controllerId;  // Recipient controller ID
  final String type;          // Command type
  final Map<String, dynamic> commandData;  // Command data

  const RemoteCommand({
    required this.controllerId,
    required this.type,
    required this.commandData,
  });
}
```

### Command Lifecycle

1. **Creation on server** — the server forms a JSON command description
2. **Parsing** — `CommandEvent.fromJson()` creates a `RemoteCommand` object
3. **Specialization** — `SpecCommand(command).specify()` transforms the base command into a typed one (e.g., `AnimationCommand`)
4. **Routing** — the driver finds the controller by `controllerId`
5. **Delivery** — the command is sent to the controller's `commandChannel`
6. **Processing** — the widget receives the command and performs the corresponding action

### Command Handling in Controllers

Widget controllers subscribe to the command channel via the `listenCommand` method:

```dart
controller.listenCommand((command) async {
  // Pattern matching to determine command type
  switch (command) {
    case AnimationCommand(:final method, :final animatedPropKey):
      await _handleAnimation(method, animatedPropKey);
      break;
    case BottomSheetCommand(:final action, :final content):
      await _handleBottomSheet(action, content);
      break;
    case PageViewNextPageCommand(:final duration, :final curve):
      await _pageController.nextPage(duration: duration, curve: curve);
      break;
    case FocusNodeRequestFocusCommand(:final nodeId):
      _focusNode.requestFocus();
      break;
  }
});
```

### Sending Commands Programmatically

In addition to receiving commands from the server, you can send commands programmatically:

```dart
// Get the controller
final controller = driver.getController("widget_id");

// Create and send a command
final command = AnimationCommand(
  controllerId: "widget_id",
  type: "animation",
  commandData: {"type": "animation", "animatedPropKey": "style", "method": 0},
  animatedPropKey: "style",
  method: AnimationMethod.forward,
  trigger: AnimationTrigger.onAction,
);

await controller.emitCommand(command);
```

### Special Controller Identifiers

Some commands use reserved identifiers:

| ID | Purpose |
|----|---------|
| `overlay` | Global controller for BottomSheet and Dialog |

### Advantages of the Command System

- **Declarative** — commands are described in JSON and can be generated on the server
- **Type-safe** — each command type has strictly typed properties
- **Extensible** — easy to add new command types
- **Separation of concerns** — command execution logic is encapsulated in the widget
- **Asynchronous** — commands are processed asynchronously via Stream

:::tip
Use commands for operations that cannot be expressed through attribute updates: animations, navigation, focus, modal windows.
:::

:::info
For complete documentation on each command type, see the [API Reference](/docs/api/dart_api/RemoteCommand).
:::

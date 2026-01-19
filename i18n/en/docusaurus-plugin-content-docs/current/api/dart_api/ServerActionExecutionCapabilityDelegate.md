# ServerActionExecutionCapabilityDelegate

A mixin that provides an interface for executing server actions **ServerAction** and handling server events **ServerEvent**.

## Methods

### execute

```dart
Future<void> execute(ServerAction action);
```

Executes the specified server action.

Implementations must provide logic for handling and executing `ServerAction`, which may include communication with an external API, running scripts, or local operations.

### preparePayload

```dart
Map<String, dynamic> preparePayload(
  Iterable<ActionDependency> dependencies,
);
```

Prepares and returns a payload from the provided dependencies to be sent with the action.

Typically used to extract local values, form state, or referenced data.

### resolveEvent

```dart
Future<void> resolveEvent(BuildContext context, eventData);
```

Handles and resolves an incoming event in the specified context.

**Parameters:**
- `context` — widget context for navigation, dialogs, and state updates
- `eventData` — event data (typically a parsed `ServerEvent`)

### addExternalEventStream

```dart
void addExternalEventStream(Stream<Map<String, dynamic>> stream);
```

Registers an external event stream for delegate processing.

Allows integrating external event sources (sockets, platform channels, etc.) into the Duit event handling system.

### attachExternalHandler

```dart
void attachExternalHandler(
  UserDefinedHandlerKind type,
  UserDefinedEventHandler handle,
);
```

Registers an external handler for the specified user event type.

**Parameters:**
- `type` — handler type ([UserDefinedHandlerKind](/docs/api/dart_api/UserDefinedHandlerKind))
- `handle` — event handler function

### releaseResources

```dart
void releaseResources();
```

Releases external resources, subscriptions, and handlers.

## UserDefinedHandlerKind

Enumeration of user-defined event handler types:

```dart
enum UserDefinedHandlerKind {
  /// Handler for opening URLs
  openUrl,
  
  /// Handler for navigation
  navigation,
  
  /// Handler for custom events
  custom,
}
```

## UserDefinedEventHandler

Signature for user-defined event handler functions:

```dart
typedef UserDefinedEventHandler = FutureOr<void> Function(
  BuildContext context,
  String path,
  Object? extra,
);
```

## Usage Example

```dart
// Register navigation handler
driver.attachExternalHandler(
  UserDefinedHandlerKind.navigation,
  (context, path, extra) {
    Navigator.pushNamed(context, path, arguments: extra);
  },
);

// Register URL opening handler
driver.attachExternalHandler(
  UserDefinedHandlerKind.openUrl,
  (context, url, extra) async {
    if (await canLaunchUrl(Uri.parse(url))) {
      await launchUrl(Uri.parse(url));
    }
  },
);

// Register custom handler
driver.attachExternalHandler(
  UserDefinedHandlerKind.custom,
  (context, key, extra) {
    print('Custom event: $key with data: $extra');
  },
);
```

## See Also

- [Actions and Events](/docs/core_concepts/actions_events)

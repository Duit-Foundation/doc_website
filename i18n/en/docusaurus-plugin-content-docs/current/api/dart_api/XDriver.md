# XDriver

Public API for working with the Duit driver.

`XDriver` is an extension type wrapper over [UIDriver](/docs/api/dart_api/UIDriver) that provides a convenient interface for initializing and managing a Duit application in various operating modes.

## Operating Modes

- **Remote** — connection to a remote server through a transport layer
- **Static** — working with predefined JSON content without server requests
- **Native Module** — integrating Duit as a module into an existing native application

## Constructors

### XDriver.remote

Creates a driver for working with a remote Duit server.

```dart
final driver = XDriver.remote(
  transportManager: HttpTransportManager(
    url: '/api/layout',
    baseUrl: 'https://api.example.com',
  ),
  initialRequestPayload: {
    'userId': '12345',
    'theme': 'dark',
  },
  loggingManager: CustomLogger(),
);
```

**Required parameters:**
- `transportManager` — transport layer manager for server communication

**Optional parameters:**
- `initialRequestPayload` — additional data for the first server request
- `nativeModuleManager` — delegate for managing native modules
- `scriptingManager` — delegate for executing client-side scripts
- `loggingManager` — delegate for customizing logging
- `focusManager` — delegate for managing UI element focus
- `actionManager` — delegate for executing server actions
- `controllerManager` — delegate for managing UI controllers
- `viewManager` — delegate for managing view models

### XDriver.static

Creates a driver for working with static JSON content.

```dart
final uiContent = {
  'type': 'Column',
  'children': [
    {'type': 'Text', 'data': 'Hello World'},
  ],
};

final driver = XDriver.static(uiContent);
```

**Required parameters:**
- `content` — JSON structure with UI description according to Duit specification

**Throws:**
- `StateError` if `content` is empty

### XDriver.nativeModule

Creates a driver for native module mode.

```dart
final driver = XDriver.nativeModule(
  nativeModuleManager: MyNativeModuleManager(),
  initialRequestPayload: {
    'hostVersion': '1.0.0',
    'features': ['analytics', 'payments'],
  },
);
```

## Methods

### init

Initializes the driver and prepares it for work.

```dart
await driver.init();
```

This method must be called before using the driver. It performs:
- Transport layer initialization
- Loading initial UI content
- Setting up all registered delegates and managers

### dispose

Releases resources used by the driver.

```dart
driver.dispose();
```

### attachExternalHandler

Registers an external event handler.

```dart
driver.attachExternalHandler(
  UserDefinedHandlerKind.custom('onButtonClick'),
  (eventData) {
    print('Button clicked: ${eventData['id']}');
  },
);
```

### addExternalEventStream

Adds an external event stream for driver processing.

```dart
final websocketStream = WebSocketChannel.connect(
  Uri.parse('ws://example.com'),
).stream.map((data) => jsonDecode(data));

driver.addExternalEventStream(websocketStream);
```

## Usage Example

```dart
class MyWidget extends StatefulWidget {
  @override
  State<MyWidget> createState() => _MyWidgetState();
}

class _MyWidgetState extends State<MyWidget> {
  late final XDriver driver;

  @override
  void initState() {
    super.initState();
    driver = XDriver.remote(
      transportManager: HttpTransportManager(
        url: '/api/layout',
        baseUrl: 'https://api.example.com',
      ),
    );
  }

  @override
  void dispose() {
    driver.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return DuitViewHost.withDriver(
      driver: driver,
      placeholder: const CircularProgressIndicator(),
    );
  }
}
```

:::tip
It's recommended to use `XDriver` together with [DuitViewHost](/docs/api/dart_api/DuitViewHost), which automatically manages the driver's lifecycle.
:::

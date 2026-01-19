# StubTransportManager

A stub for the transport manager.

Implements [TransportCapabilityDelegate](/docs/api/dart_api/TransportCapabilityDelegate) as an empty implementation that doesn't perform any network operations. Used when working with static content or in test scenarios.

## Constructor

```dart
StubTransportManager();
```

## Features

- All methods log a warning that they are not implemented
- Returns empty data for all requests
- When calling `connect` with static content, returns that content

## Usage Examples

### Automatic Usage

`StubTransportManager` is automatically used when creating a driver in static mode:

```dart
final driver = XDriver.static({
  'type': 'Column',
  'children': [
    {'type': 'Text', 'data': 'Hello World'},
  ],
});
// StubTransportManager is used internally
```

### Explicit Usage

```dart
final driver = XDriver.static(
  content,
  transportManager: StubTransportManager(),
);
```

## Methods

All `TransportCapabilityDelegate` methods are implemented, but:
- `executeRemoteAction` — logs a warning, returns empty `Map`
- `request` — logs a warning, returns empty `Map`
- `connect` — returns the provided `staticContent` or empty `Map`

:::tip
Use `StubTransportManager` for testing UI without needing to set up a backend.
:::

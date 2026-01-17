# UserDefinedHandlerKind

Enumeration of user-defined event handler types for registration in the action manager.

## Values

### openUrl

```dart
UserDefinedHandlerKind.openUrl
```

Handler for URL opening events in a browser or app.

### navigation

```dart
UserDefinedHandlerKind.navigation
```

Handler for navigation events within the app (e.g., navigating to a new screen).

### custom

```dart
UserDefinedHandlerKind.custom
```

Handler for custom events with arbitrary logic.

## UserDefinedEventHandler

Handler function signature:

```dart
typedef UserDefinedEventHandler = FutureOr<void> Function(
  BuildContext context,
  String path,
  Object? extra,
);
```

**Parameters:**
- `context` — widget context for accessing the widget tree
- `path` — path or URL (depending on event type)
- `extra` — additional event data (optional)

## Usage Example

```dart
final driver = XDriver.remote(
  transportManager: HttpTransportManager(...),
);

// Navigation handler
driver.attachExternalHandler(
  UserDefinedHandlerKind.navigation,
  (context, path, extra) {
    Navigator.pushNamed(context, path, arguments: extra);
  },
);

// URL opening handler
driver.attachExternalHandler(
  UserDefinedHandlerKind.openUrl,
  (context, url, extra) async {
    final uri = Uri.parse(url);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri);
    }
  },
);

// Custom handler
driver.attachExternalHandler(
  UserDefinedHandlerKind.custom,
  (context, key, extra) {
    switch (key) {
      case 'show_dialog':
        showDialog(
          context: context,
          builder: (_) => AlertDialog(
            title: Text(extra?['title'] ?? 'Info'),
            content: Text(extra?['message'] ?? ''),
          ),
        );
        break;
      case 'analytics_event':
        analytics.logEvent(key, parameters: extra);
        break;
    }
  },
);
```

## See Also

- [ServerActionExecutionCapabilityDelegate](/docs/api/dart_api/ServerActionExecutionCapabilityDelegate)
- [Actions and Events](/docs/core_concepts/actions_events)

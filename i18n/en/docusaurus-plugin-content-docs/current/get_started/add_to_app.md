# Integration with Client Application

From the outset, Duit was designed to simplify integration with new and existing Flutter applications. The integration process consists of several steps:

## Initializing the Driver

To use Duit, it's essential to create an instance of `DuitDriver`. At this stage, we can apply previously created extensions to the driver.

```dart
late final DuitDriver driver;

@override
void initState() {
  driver = DuitDriver(
    "/endpoint_name",
    transportOptions: HttpTransportOptions(
      defaultHeaders: {
        "Content-Type": "application/json",
      },
      baseUrl: "https://host:port",
    ),
  );
  super.initState();
}

@override
void dispose() {
  driver.dispose();
  super.dispose();
}
```

## Adding host view

A Duit representation can serve as a standalone widget or display content across an entire screen. This content must be displayed in a special container that ensures proper initialization and construction of the UI.

```dart
  @override
Widget build(BuildContext context) {
  return Scaffold(
    body: SafeArea(
      child: Center(
        child: DuitViewHost(
          driver: driver,
          placeholder: const CircularProgressIndicator(),
        ),
      ),
    ),
  );
}
```

Once the DuitViewHost widget is mounted, it will initialize with the specified parameters, execute the initial layout request, and render the result.

## Global configuration

Duit offers a public API for globally configuring the framework, registering [components](advanced_tech/components/about.md), and [custom widgets](advanced_tech/custom/about.md).

```dart
void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  DuitRegistry.configure();
  
  // Register custom widget
  DuitRegistry.register(
    "widget_key",
    modelFactory: mF,
    buildFactory: bF,
    attributesFactory: aF,
  );

  // Register components
  final response = await httpClient.get("http://localhost:8999/components");
  await DuitRegistry.registerComponents([...response.data]);

  runApp(const MyApp());
}
```

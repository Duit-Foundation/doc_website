# Интеграция с клиентским приложением

Изначально Duit проектировался с прицелом на максимальное упрощение интеграции с новыми и
существующими приложениями, написанными на Flutter. Интеграция состоит из нескольких шагов:

## 1. Инициализация драйвера

Для работы Duit-представления обязательно необходимо создать экземпляр DuitDriver. На этом этапе мы
можем применять к драйверу ранее созданные расширения.

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

## 2. Добавить host view

Duit-представление может быть как отдельным виджетом, так и отображать контент целого экрана. Этот
контент должен быть отображен в специальном контейнере, который обеспечивает корректную
инициализацию и построение UI.

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

После этого при монтировании виджета DuitViewHost будет инциализирован с указанными выше
параметрами, выполнит начальный запрос макета виджета/экрана и отобразит его.

## 3. Глобальные настройки

Duit предоствляет публичный API для глобальной конфигурации фреймворка, регистрации компонентов и
пользовательских виджет.

```dart
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
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
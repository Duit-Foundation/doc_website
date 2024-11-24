# Интеграция с клиентским приложением

Изначально Duit проектировался с прицелом на максимальное упрощение интеграции с новыми и
существующими приложениями, написанными на Flutter. Интеграция состоит из нескольких шагов:

## 0. Конфигурация DuitRegistry

Если вы используете пакет duit_kernel для использования продвинутой функциональности Duit, то вам
предварительно потребуется инициализировать/зарегистрировать необходимые сущности. Например, макеты
компонентов или кастомные виджеты.

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
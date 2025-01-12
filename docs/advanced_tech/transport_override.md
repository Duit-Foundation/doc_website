# Переопределение реализации транспортного слоя

Зачастую разработчики при разработке своих приложений для работы с сетью использую сторонние пакеты, например [dio](https://pub.dev/packages/dio).

Duit в рамках базовой реализации использует пакет [http](https://pub.dev/packages/http). Чтобы дать возможность разработчикам использовать привычные инструменты и интегрировать их с фреймворком или реализовывать работу с сетью в рамках других сетевых протоколов (gRPC, GQL) существует механика переопределения реализации транспортного слоя.

## Реализация TransportOptions

Данный класс отвечает за конфигурацию транспортного слоя и используется при создании экземпляра `DuitDriver`. Класс может содержать любые необходимые для работы свойста. 

```dart
final class DioTransportOpions extends TransportOptions {
  @override
  String? baseUrl;

  @override
  Map<String, String> defaultHeaders = const {};

  @override
  String type = "dio";

  final Dio dioInstance;

  DioTransportOpions(this.dioInstance);
}
```

## Реализация Transport 

Реализация абстрактного класса `Transport` отвечает за непосредственное взаимодействие с сетью (в нашем случае с помощью dio).

Класс требует реализовать 4 основных метода:
1. connect - метод вызывается во время инициализации драйвера и служит для получения начального макета экрана или виджета.
2. dispose - метод очистки ресурсов транспорта. Вызывается при уничтожении родительского драйвера.
3. execute - метод, выполняющий заданное действие (http запрос). Возвращает новое событие или события.
4. request - служебный метод для выполнения произвольного запроса по указаному URL с переданными данными.

:::tip
Реализация метода request обязательна только в тех случаях, когда транспорт используется совместно с интегрированной средой выполнения скриптов. Подробнее об этом можно узнать в соотвествующем [разделе](/docs/advanced_tech/scripting).
:::


```dart
final class DioTransport extends Transport {
  final DioTransportOpions opts;

  DioTransport(this.opts) : super("/initial_path");

  @override
  Future<Map<String, dynamic>?> connect({Map<String, dynamic>? initialData}) {
    // TODO: implement connect
    throw UnimplementedError();
  }

  @override
  void dispose() {
    // TODO: implement dispose
  }

  @override
  FutureOr<Map<String, dynamic>?> execute(
      ServerAction action, Map<String, dynamic> payload) {
    // TODO: implement execute
    throw UnimplementedError();
  }

  @override
  FutureOr<Map<String, dynamic>?> request(
      String url, Map<String, dynamic> meta, Map<String, dynamic> body) {
    // TODO: implement request
    throw UnimplementedError();
  }
}
```

## Расширение UIDriver

Расширения UIDriver являются безопасным способом переопределения некоторых базовых частей фреймворка, таких как `Transport` или `ScriptRunner`.

```dart
extension DioExtension on UIDriver {
  void applyDioExtension() {
    transport = DioTransport(
      transportOptions as DioTransportOpions,
    );
  }
}
```
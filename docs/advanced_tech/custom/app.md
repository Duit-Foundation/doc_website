# Пользовательские виджеты - клиент

## Создание класса атрибутов виджета

Класс атрибутов пользовательского виджета отвечает за корректный парсинг свойств виджета из JSON, а
также его копирование.

:::tip
Метод `dispatchInternalCall` необходимо реализовать только в том случае, если виджет может работать
с
анимациями.

Для анимации виджета средствами Duit, наследуйте свой класс атрибутов от класса
`AnimatedPropertyOwner`.
:::

```dart
class SvgWidgetAttributes implements DuitAttributes<SvgWidgetAttributes> {
  final String content;
  final double? width, height;

  SvgWidgetAttributes({
    required this.content,
    this.height,
    this.width,
  });

  static SvgWidgetAttributes fromJson(Map<String, dynamic> json) {
    final w = json["width"] as num?;
    final h = json["height"] as num?;
    return SvgWidgetAttributes(
      content: json["content"] ?? "",
      height: w?.toDouble(),
      width: h?.toDouble(),
    );
  }

  @override
  SvgWidgetAttributes copyWith(other) {
    return SvgWidgetAttributes(
      content: other.content,
      height: other.height ?? height,
      width: other.width ?? width,
    );
  }

  @override
  ReturnT dispatchInternalCall<ReturnT>(String methodName, {
    Iterable? positionalParams,
    Map<String, dynamic>? namedParams,
  }) {
    return switch (methodName) {
      "fromJson" => SvgWidgetAttributes.fromJson(positionalParams!.first) as ReturnT,
      String() => throw UnimplementedError("$methodName is not implemented"),
    };
  }
}
```

## Создание класса модели виджета

Модель виджета – составляющая объектной модели макета. Она хранит ссылки на все необходимые для
дальнейшей работы объекты и служебную информацию о виджете:

- id – уникальный идентификатор виджета;
- attributes – атрибуты виджета (для неконтролируемых виджетов);
- viewController – контроллер виджета (только для контролируемых виджетов);
- controlled – флаг типа виджета;
- subviews – дочерние виджеты (при наличии).

Все модели пользовательских виджетов должны наследоватьcя от класса `CustomUiElement`.

```dart
final class SvgWidget extends CustomUiElement {
  SvgWidget({
    required super.id,
    required super.attributes,
    required super.viewController,
    required super.controlled,
    required super.subviews,
  }) : super(
    tag: "SvgCustomWidget",
  );
}

```

## Фабрика атрибутов

Фабрика атрибутов – функция, которая преобразует JSON в атрибуты виджета. На этом этапе допустимы
преобразования JSON в соответствии с потребностями разработки.

```dart
DuitAttributes svgAttributeFactory(String type,
    Map<String, dynamic>? json,) {
  //your custom code for parsing json

  return SvgWidgetAttributes.fromJson(json ?? {});
}
```

## Фабрика модели

Фабрика модели – функция, где происходит создание экземпляра модели виджета и передача необходимых
значений в конструктор.

```dart
ElementTreeEntry svgModelFactory(String id,
    bool controlled,
    ViewAttribute attributes,
    UIElementController? controller, [
      Iterable<ElementTreeEntry> subviews = const {},
    ]) {
  return SvgWidget(
    id: id,
    attributes: attributes,
    viewController: controller,
    controlled: controlled,
    subviews: subviews,
  );
}
```

## Build фабрика

Build-фабрика – функция, где на основе данных из модели виджета создаётся виджет Flutter. Для
получения данных из модели используется приведение типа к типу модели или, как в примере ниже, к
типу атрибута.

На этом этапе также осуществляется передача дочерних виджетов в целевой виджет (при необходимости).

```dart
Widget svgBuildFactory(ElementTreeEntry model, [
  Iterable<Widget> subviews = const {},
]) {
  final data = model.attributes?.payload as SvgWidgetAttributes;

  return SvgPicture.string(
    data.content,
    width: data.width,
    height: data.height,
  );
}
```

## Регистрация виджета

Регистрация виджета в DuitRegistry осуществляется с помощью метода `DuitRegistry.register` и позволяет
встроить функции-фабрики в пайплайн обработки. **Важно**: тег пользовательского виджета должен совпадать
с тегом, который используется на сервере.

```dart
DuitRegistry.register(
  "SvgCustomWidget",
  modelFactory: svgModelFactory,
  buildFactory: svgBuildFactory,
  attributesFactory: svgAttributeFactory,
);
```
# Пользовательские виджеты - клиент

## Создание класса атрибутов виджета

:::info Deprecated
Начиная с актуальной версии Duit, разработчикам больше не требуется вручную создавать класс атрибутов виджета. Система автоматически работает с атрибутами через контроллер виджета.

Доступ к атрибутам осуществляется через `ViewControllerChangeListener` mixin в StatefulWidget.
:::

<details>
<summary>Старый способ (не рекомендуется)</summary>

Класс атрибутов пользовательского виджета отвечает за корректный парсинг свойств виджета из JSON, а
также его копирование.

:::tip
Метод `dispatchInternalCall` необходимо реализовать только в том случае, если виджет может работать
с анимациями.

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

</details>

## Создание класса модели виджета

:::info Deprecated
Начиная с актуальной версии Duit, разработчикам больше не требуется вручную создавать класс модели виджета. Система автоматически создает модели на основе структуры JSON.

Класс модели виджета больше не используется в новом API.
:::

<details>
<summary>Старый способ (не рекомендуется)</summary>

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

</details>

## Фабрика атрибутов

:::info Deprecated
Начиная с актуальной версии Duit, разработчикам больше не требуется создавать фабрику атрибутов. Система автоматически парсит атрибуты из JSON.

Фабрика атрибутов больше не используется в новом API.
:::

<details>
<summary>Старый способ (не рекомендуется)</summary>

Фабрика атрибутов – функция, которая преобразует JSON в атрибуты виджета. На этом этапе допустимы
преобразования JSON в соответствии с потребностями разработки.

```dart
DuitAttributes svgAttributeFactory(String type,
    Map<String, dynamic>? json,) {
  //your custom code for parsing json

  return SvgWidgetAttributes.fromJson(json ?? {});
}
```

</details>

## Фабрика модели

:::info Deprecated
Начиная с актуальной версии Duit, разработчикам больше не требуется создавать фабрику модели. Система автоматически создает модели на основе структуры JSON.

Фабрика модели больше не используется в новом API.
:::

<details>
<summary>Старый способ (не рекомендуется)</summary>

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

</details>

## Build фабрика

Build-фабрика – функция, где на основе данных из модели виджета создаётся виджет Flutter.

Build-фабрика принимает два параметра:

- `ElementTreeEntry model` – модель виджета, содержащая все необходимые данные и контроллер
- `Iterable<Widget> subviews` – дочерние виджеты (опционально)

Доступ к данным виджета осуществляется через контроллер (`model.viewController`). Для получения атрибутов в StatefulWidget используйте mixin `ViewControllerChangeListener`.

```dart
Widget svgBuildFactory(
  ElementTreeEntry model, [
  Iterable<Widget> subviews = const {},
]) {
  // Создание виджета с контроллером
  return SvgPictureWidget(
    controller: model.viewController,
    child: subviews.isEmpty ? null : subviews.first,
  );
}

class SvgPictureWidget extends StatefulWidget {
  final UIElementController controller;
  final Widget? child;

  const SvgPictureWidget({
    required this.controller,
    this.child,
  });

  @override
  State<SvgPictureWidget> createState() => _SvgPictureWidgetState();
}

class _SvgPictureWidgetState extends State<SvgPictureWidget>
    with ViewControllerChangeListener {
  @override
  void initState() {
    // Подключение к контроллеру для получения обновлений
    attachStateToController(widget.controller);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    // Получение данных из атрибутов
    final content = attributes.getString(key: "content") ?? "";
    final width = attributes.getDouble(key: "width");
    final height = attributes.getDouble(key: "height");

    return SvgPicture.string(
      content,
      width: width,
      height: height,
      child: widget.child,
    );
  }
}
```

## Регистрация виджета

Регистрация виджета в DuitRegistry осуществляется с помощью метода `DuitRegistry.register` и позволяет
встроить build фабрику в пайплайн обработки. **Важно**: тег пользовательского виджета должен совпадать
с тегом, который используется на сервере.

```dart
DuitRegistry.register(
  "SvgCustomWidget",
  buildFactory: svgBuildFactory,
);
```

:::note
Методы `modelFactory` и `attributesFactory` больше не используются в актуальном API. Система автоматически определяет типы атрибутов и моделей на основе структуры JSON.
:::

# Действия и события

Важным свойством любого приложения является обработка действий пользователя и реакция пользовательского интерфейса (UI) на эти действия.

Duit предоставляет мощный и расширяемый событийно-ориентированный API, который позволяет описывать на сервере специальные структуры, определяющие, как фреймворк должен реагировать на взаимодействие с элементами UI и то, каким образом должен быть изменен интерфейс в результате взаимодействия. За это отвечает Action&Event API.

## Действия

Действие - описанная на стороне сервера структура, определяющая что должно произойти после взаимодействия.

В Duit существует три основных типа действий. Они отличаются друг от друга тем, как они будут обработаны и какие механизмы фреймворка будут задействованы.

### TransportAction

TransportAction - действия, задействующие [транспортный слой](/docs/core_concepts/transport_layer) Duit. Описание действия содержит название эндпоинта на стороне сервера, к которому будет идти обращение в ходе выполнения, список зависимостей действия, а также опционально дополнительные данные (HttpActionMetainfo).

```json
{
    "executionType": 0 // 0 - transport, 1 - local, 2 - script
    "dependsOn": [
        {"tagret": "key_in_obj", "id":"id1"}
        {"tagret": "key_in_ob2j", "id":"id2"}
    ],
    "event": "/some/endpoint",
    "meta": {
        "method": "POST",
    },
}
```

### LocalAction

Локальное действие мгновенно выполняет связанное событие или группу событий. Оно может быть полезно, когда надо изменить состояние UI, но обращение к серверу для этого не требуется.

```json
{
    "executionType": 1 // 0 - transport, 1 - local, 2 - script
    "event": {...}, //related event
}
```

### ScriptAction

Специальный тип действия, который содержит в своем описании динамический скрипт, который будет выполняться в интегрированной среде выполенения. Подробнее об использовании скриптов читайте в соотвествующем [разделе](/docs/advanced_tech/scripting) документации.

```json
{
    "executionType": 2 // 0 - transport, 1 - local, 2 - script
    "dependsOn": [
        {"tagret": "key_in_obj", "id":"id1"}
        {"tagret": "key_in_ob2j", "id":"id2"}
    ],
    "script": {
        "sourceCode": "fun test() {...}", //script text
        "functionName": "test", //function to call
        "meta": {...} //additional info
    }
}
```

## Опции выполнения действий

Duit предоставляет возможность управления частотой выполнения действий через механизм `ExecutionOptions`. Это позволяет контролировать, как часто действие может быть выполнено, что особенно полезно для предотвращения излишних запросов к серверу.

### ExecutionOptions

Опции выполнения действий поддерживают два модификатора:

- **`throttle`** - ограничивает частоту выполнения действия. Действие будет выполнено максимум один раз за указанный период времени. При повторных вызовах в течение периода выполнения будут игнорироваться.
- **`debounce`** - откладывает выполнение действия до окончания периода бездействия. Выполнение откладывается до тех пор, пока не пройдет указанное время без новых вызовов.

```json
{
    "executionType": 0,
    "dependsOn": [...],
    "event": "/some/endpoint",
    "meta": {
        "method": "POST"
    },
    "executionOptions": {
        "modifier": "throttle",
        "duration": 500
    }
}
```

Пример для debounce:

```json
{
    "executionType": 0,
    "event": "/search",
    "executionOptions": {
        "modifier": "debounce",
        "duration": 300
    }
}
```

## Зависимости действий

В ходе работы с приложением пользователь может использовать такие элементы UI, как TextField, CheckBox, Radio и тд. Использование подобных элементов подразумевает сбор и использование данных, которые ввел пользователь.

Для работы с такими случаями `TransportAction` и `ScriptAction` обладают свойством `dependsOn`, которое является списоком объектов вида `{"tagret": "key_in_obj", "id":"id1"}` (где target - ключ свойства результирущего объекта, а id - идентификатор контроллируемого виджета), из которых требуется собрать значения и использовать при выполнении действия.

При выполнении действия, для которого указаны зависимости, Duit попытается обратиться к контроллерам этих элементов для получения их текущих значений из атрибутов. Классы атрибутов, которые могут изменять в ходе работы свое хранимое значение и имеют геттер для его получения, наследуются от класса `AttendedModel<T>`. Например, класс [TextFieldAttributes](https://github.com/Duit-Foundation/flutter_duit/blob/main/lib/src/attributes/text_field_attrs.dart).

В ходе сбора данных согласно списку зависимостей будет создан результирующий объект с данными. Далее он будет передан транспортному слою, который способен подготовить его к передаче. Например, в случае с HTTP GET запросом, объект будет преобразован в query params и добавлен в URL запроса, а в случае POST запроса - добавлен в тело запроса.

Используя этот механизм можно реализовывать формы, данные которых будут отправлены на сервер в ходе выполениния действия.

## События

Событие - результат выполнения действия, описывает поведение UI после его успешного выполнения.
Duit поддерживает несколько видов базовых действий, каждый из которых будет разобран ниже:

### UpdateEvent

Событие отвечает за обновление контрллируемых элементов интерфейса. Описание события содержит объект `updates`,
в котором ключами являются id контрллируемых виджетов (для поиска и использования нужного контроллера), а значениями - новые атрибуты виджета.

```json
{
  "type": "update",
  "updates": {
    "text_1": {
      "data": "New text",
      // "color": "#DCDCDC" сan`t be handled
      "style": {
        "color": "#DCDCDC"
      }
    }
  }
}
```

:::warning
Парсинг новых атрибутов не поддерживает "плоские" значения. Если свойство является сложносоставным (например, TextStyle), оно должно повторять структуру оригинального класса.
:::

### CommandEvent

Событие, которое отправляет команду контроллеру для выполнения специальных операций. Команды позволяют серверу напрямую взаимодействовать с контроллерами виджетов, вызывая специфическое поведение.

Базовая структура CommandEvent:

```json
{
  "type": "command",
  "controllerId": "widget_id",
  "commandData": {
    "type": "animation",
    // ... специфичные для типа команды данные
  }
}
```

#### Поддерживаемые типы команд

| Тип | Описание | API Reference |
|-----|----------|---------------|
| `animation` | Управление анимацией свойств | [AnimationCommand](/docs/api/dart_api/AnimationCommand) |
| `bottomSheet` | Показ/скрытие модальных окон | [BottomSheetCommand](/docs/api/dart_api/BottomSheetCommand) |
| `dialog` | Показ/скрытие диалоговых окон | [DialogCommand](/docs/api/dart_api/DialogCommand) |
| `pageView` | Управление PageView/PageController | [PageViewCommand](/docs/api/dart_api/PageViewCommand) |
| `focusNode` | Управление фокусом элементов | [FocusNodeCommand](/docs/api/dart_api/FocusNodeCommand) |

#### Команда анимации (animation)

```json
{
  "type": "command",
  "controllerId": "animated_widget_id",
  "commandData": {
    "type": "animation",
    "animatedPropKey": "style",
    "method": 0,
    "trigger": "onAction"
  }
}
```

Параметры:

- `animatedPropKey` - ключ анимируемого свойства
- `method` - метод анимации: `0` (forward), `1` (repeat), `2` (reverse), `3` (toggle)
- `trigger` - триггер: `onEnter` (при появлении) или `onAction` (при действии)

#### Команда BottomSheet

```json
{
  "type": "command",
  "controllerId": "overlay",
  "commandData": {
    "type": "bottomSheet",
    "action": "open",
    "content": {...},
    "isScrollControlled": true,
    "isDismissible": true,
    "enableDrag": true,
    "showDragHandle": true,
    "backgroundColor": "#FFFFFF"
  }
}
```

Параметры:

- `action` - действие: `open` или `close`
- `content` - содержимое (дерево виджетов)
- `isScrollControlled`, `isDismissible`, `enableDrag` - настройки поведения
- `onClose` - действие при закрытии

#### Команда Dialog

```json
{
  "type": "command",
  "controllerId": "overlay",
  "commandData": {
    "type": "dialog",
    "action": "open",
    "content": {...},
    "barrierDismissible": true,
    "useSafeArea": true
  }
}
```

#### Команда PageView

```json
{
  "type": "command",
  "controllerId": "page_view_id",
  "commandData": {
    "type": "pageView",
    "action": "animateToPage",
    "page": 2,
    "duration": 300,
    "curve": "easeInOut"
  }
}
```

Поддерживаемые действия:

- `nextPage`, `previousPage` - переход между страницами
- `animateToPage`, `animateTo` - анимированный переход
- `jumpToPage`, `jumpTo` - мгновенный переход

#### Команда FocusNode

```json
{
  "type": "command",
  "controllerId": "text_field_id",
  "commandData": {
    "type": "focusNode",
    "action": "requestFocus"
  }
}
```

Поддерживаемые действия:

- `requestFocus` - запросить фокус
- `unfocus` - снять фокус
- `nextFocus`, `previousFocus` - переход между элементами
- `focusInDirection` - переход в направлении (`up`, `down`, `left`, `right`)

:::info
Подробную информацию о каждом типе команды смотрите в разделе [API Reference](/docs/api/dart_api/RemoteCommand).
:::

### TimerEvent

Событие, которое будет запущено по истечении таймера. Описание содержит вложенное событие или группу событий и длительность таймера.

```json
{
    "type": "timer",
    "timerDelay": 1000, // in ms
    "event": {...}, //nested event
}
```

### SequencedEventGroup

Группа событий, позволяющиая последовательно выполнять вложенные события с заданным интервалом.

```json
{
    "type": "sequenced",
    "delay": 1000, // in ms
    "events": [
        {...}, //event 1
        {...}, //event 2
        {...}, //event 3
    ], //nested events
}
```

### CommonEventGroup

Группа событий, позволяющиая выполнять вложенные события.

```json
{
    "type": "grouped",
    "events": [
        {...}, //event 1
        {...}, //event 2
        {...}, //event 3
    ], //nested events
}
```

:::warning
Порядок выполнения действий не гарантирован!
:::

### NavigationEvent, OpenUrlEvent и CustomEvent

Эта группа событий требует регистрации внешних обработчиков через метод `attachExternalHandler` драйвера. Вместо использования интерфейса `ExternalEventHandler`, теперь используется механизм регистрации отдельных обработчиков для каждого типа события.

Для регистрации используется перечисление `UserDefinedHandlerKind`, которое определяет тип события:

- `navigation` — для событий навигации (`NavigationEvent`).
- `openUrl` — для открытия внешних ссылок (`OpenUrlEvent`).
- `custom` — для пользовательских событий (`CustomEvent`).

Все обработчики должны соответствовать сигнатуре `UserDefinedEventHandler`:

```dart
typedef UserDefinedEventHandler = FutureOr<void> Function(
  BuildContext context,
  String path,
  Object? extra,
);
```

Пример регистрации обработчиков:

```dart
driver.attachExternalHandler(
  UserDefinedHandlerKind.navigation,
  (context, path, extra) {
    // Логика перехода на другой экран
  },
);

driver.attachExternalHandler(
  UserDefinedHandlerKind.openUrl,
  (context, url, _) {
    // Логика открытия URL
  },
);
```

**NavigationEvent** — применяется в случаях, если необходимо выполнить переход на другой экран приложения, не являющийся Duit-экраном.

**OpenUrlEvent** — предназначено для открытия внешних ссылок в браузере устройства.

**CustomEvent** — специальный тип события, позволяющий обрабатывать события, которые не были предусмотрены разработчиками. Полезно в случаях гибридной интеграции Duit с приложением.

### Внешние потоки событий

Duit позволяет интегрировать внешние источники событий (например, WebSockets, Firebase или события нативной платформы) в систему обработки событий драйвера. События из этих потоков будут автоматически обрабатываться драйвером и могут вызывать обновления UI или выполнение зарегистрированных обработчиков.

Для добавления потока используется метод `addExternalEventStream`:

```dart
final websocketStream = WebSocketChannel.connect(
  Uri.parse('ws://example.com'),
).stream.map((data) => jsonDecode(data) as Map<String, dynamic>);

driver.addExternalEventStream(websocketStream);
```

**Важные особенности:**

- Драйвер автоматически подписывается на поток при его добавлении и отменяет подписку при вызове `dispose`.
- Вы можете добавить несколько потоков, они будут обрабатываться параллельно.
- Структура событий в потоке должна соответствовать ожидаемому формату Duit или обрабатываться зарегистрированными внешними обработчиками.

### NullEvent

Сервисное событие. Парсер событий возвращает его в том случае, если объект события не может быть корректно обработан.

## Система удалённых команд (RemoteCommand)

Система удалённых команд — это механизм, позволяющий серверу напрямую управлять поведением виджетов через контроллеры. В отличие от `UpdateEvent`, который обновляет атрибуты виджета, команды вызывают специфическое поведение: запуск анимаций, управление навигацией PageView, управление фокусом, отображение модальных окон и другие операции.

### Архитектура

```
┌─────────────┐      ┌──────────────┐      ┌─────────────────────┐      ┌────────────┐
│   Server    │ ───▶ │ CommandEvent │ ───▶ │ UIElementController │ ───▶ │   Widget   │
└─────────────┘      └──────────────┘      └─────────────────────┘      └────────────┘
                            │
                            ▼
                     ┌──────────────┐
                     │ RemoteCommand│
                     │   (base)     │
                     └──────────────┘
                            │
          ┌─────────────────┼─────────────────┐
          ▼                 ▼                 ▼
   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
   │ Animation    │  │ BottomSheet  │  │ PageView     │
   │ Command      │  │ Command      │  │ Command      │
   └──────────────┘  └──────────────┘  └──────────────┘
```

### Базовый класс RemoteCommand

Все команды наследуются от базового класса `RemoteCommand`:

```dart
base class RemoteCommand {
  final String controllerId;  // ID контроллера-получателя
  final String type;          // Тип команды
  final Map<String, dynamic> commandData;  // Данные команды

  const RemoteCommand({
    required this.controllerId,
    required this.type,
    required this.commandData,
  });
}
```

### Жизненный цикл команды

1. **Создание на сервере** — сервер формирует JSON-описание команды
2. **Парсинг** — `CommandEvent.fromJson()` создаёт объект `RemoteCommand`
3. **Специализация** — `SpecCommand(command).specify()` преобразует базовую команду в типизированную (например, `AnimationCommand`)
4. **Маршрутизация** — драйвер находит контроллер по `controllerId`
5. **Доставка** — команда отправляется в `commandChannel` контроллера
6. **Обработка** — виджет получает команду и выполняет соответствующее действие

### Обработка команд в контроллере

Контроллеры виджетов подписываются на канал команд через метод `listenCommand`:

```dart
controller.listenCommand((command) async {
  // Pattern matching для определения типа команды
  switch (command) {
    case AnimationCommand(:final method, :final animatedPropKey):
      await _handleAnimation(method, animatedPropKey);
      break;
    case BottomSheetCommand(:final action, :final content):
      await _handleBottomSheet(action, content);
      break;
    case PageViewNextPageCommand(:final duration, :final curve):
      await _pageController.nextPage(duration: duration, curve: curve);
      break;
    case FocusNodeRequestFocusCommand(:final nodeId):
      _focusNode.requestFocus();
      break;
  }
});
```

### Отправка команд программно

Помимо получения команд с сервера, вы можете отправлять команды программно:

```dart
// Получение контроллера
final controller = driver.getController("widget_id");

// Создание и отправка команды
final command = AnimationCommand(
  controllerId: "widget_id",
  type: "animation",
  commandData: {"type": "animation", "animatedPropKey": "style", "method": 0},
  animatedPropKey: "style",
  method: AnimationMethod.forward,
  trigger: AnimationTrigger.onAction,
);

await controller.emitCommand(command);
```

### Специальные идентификаторы контроллеров

Некоторые команды используют зарезервированные идентификаторы:

| ID | Назначение |
|----|------------|
| `overlay` | Глобальный контроллер для BottomSheet и Dialog |

### Преимущества системы команд

- **Декларативность** — команды описываются в JSON и могут быть сгенерированы на сервере
- **Типобезопасность** — каждый тип команды имеет строго типизированные свойства
- **Расширяемость** — легко добавлять новые типы команд
- **Разделение ответственности** — логика выполнения команды инкапсулирована в виджете
- **Асинхронность** — команды обрабатываются асинхронно через Stream

:::tip
Используйте команды для операций, которые не могут быть выражены через обновление атрибутов: анимации, навигация, фокус, модальные окна.
:::

:::info
Полную документацию по каждому типу команды смотрите в разделе [API Reference](/docs/api/dart_api/RemoteCommand).
:::

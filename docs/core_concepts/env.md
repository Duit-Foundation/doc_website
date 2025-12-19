# Переменные окружения

На этой странице описаны переменные окружения времени компиляции, используемые в пакетах DUIT, и способы их включения/отключения в разных сценариях сборки и запуска.

Все перечисленные ниже переменные — это константы времени компиляции, получаемые через `bool.fromEnvironment`, то есть они вычисляются на этапе сборки и должны передаваться через флаги инструментов сборки.

## Доступные переменные

1) `duit:throw-on-unspecified-widget-type`

- Пакет: `flutter_duit`
- Тип: `bool` (compile-time)
- Значение по умолчанию: `true`
- Назначение: при встрече неизвестного типа виджета выбрасывает `ArgumentError` (если `true`) вместо возврата пустого fallback‑виджета (если `false`). Полезно в разработке, чтобы рано выявлять проблемы схемы/модели.

2) `duit:enable-warm-up`

- Пакет: `duit_kernel`
- Тип: `bool` (compile-time)
- Значение по умолчанию: `false`
- Назначение: включает тёплый старт (warm‑up) атрибутов. При включении ядро может предварительно инициализировать структуры, связанные с атрибутами, чтобы уменьшить задержку первого использования.

3) `duit:prefer-inline`

- Пакет: `duit_kernel`
- Тип: `bool` (compile-time)
- Значение по умолчанию: `true`
- Назначение: предпочитает inline‑стратегии для функций в ядре там, где это поддерживается. Предназначено для тонкой настройки производительности и экспериментов.

4) `duit:allow-focus-node-override`

- Пакет: `flutter_duit`
- Тип: `bool` (compile-time)
- Значение по умолчанию: `false`
- Назначение: определяет поведение при привязке `FocusNode` к драйверу, если происходит попытка повторной привязки ноды с одним и тем ее `nodeId`.

## Как задавать значения

Это флаги времени компиляции — их нужно передавать в команды сборки/запуска/тестов.

#### Dart

Для команд Dart CLI используйте `-Dkey=value` (или `--define=key=value`).

Запуск консольного приложения:

```bash
dart run -Dduit:enable-warm-up=true -Dduit:prefer-inline=true
```

Запуск Dart‑тестов:

```bash
dart test -Dduit:enable-warm-up=true
```

#### Flutter (run/build/test)

Для команд Flutter CLI используйте `--dart-define`.

Запуск приложения:

```bash
fvm flutter run -d macos \
  --dart-define=duit:throw-on-unspecified-widget-type=false \
  --dart-define=duit:enable-warm-up=true \
  --dart-define=duit:prefer-inline=true
```

Сборка релиза (пример для iOS/Android/Web):

```bash
# Android APK
fvm flutter build apk \
  --dart-define=duit:throw-on-unspecified-widget-type=true \
  --dart-define=duit:enable-warm-up=true

# iOS
flutter build ios \
  --dart-define=duit:prefer-inline=true

# Web
flutter build web \
  --dart-define=duit:enable-warm-up=true \
  --dart-define=duit:prefer-inline=true
```

Запуск тестов:

```bash
flutter test \
  --dart-define=duit:throw-on-unspecified-widget-type=false
```

## Рекомендации

- Комбинируйте несколько `--dart-define` по необходимости — переменные независимы.
- Передавайте флаги единообразно в CI, локальных запусках и разных таргетах, чтобы избежать расхождений поведения.
- При изменении значения выполните «чистую» пересборку, чтобы новое значение гарантированно попало во все артефакты.

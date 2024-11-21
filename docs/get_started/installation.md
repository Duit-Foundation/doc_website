---
sidebar_position: 1
---

# Установка пакетов

## Клиент

Для базового использования Duit требуется установить
пакет [flutter_duit](https://pub.dev/packages/flutter_duit).

```text 
flutter pub add flutter_duit
```

Для использования некоторых продвинутых функций Duit, расшинения его функциональности или
переопределения базовых механизмов, следует также установить
пакет [duit_kernel](https://pub.dev/packages/duit_kernel), который содержит
базовые интерфейсы, функции и классы, которые позволяют засширять поведение Duit, а также создавать
therd-party расширения.

```text 
flutter pub add duit_kernel
```

## Сервер

В данное время доступно, развивается и поддерживается две библиотеки (бекенд-адаптеры) для
облегчения работы с Duit на стороне сервера: duit_js для проектов использующих Javascript/Typescript
и duit_go для проектов использующих Golang. 

Установите соотвествующий пакет, используя одну из данных команды:

Go:
```text
go get github.com/Duit-Foundation/duit_go/v3
```

JS:
```text
npm install duit_js
```

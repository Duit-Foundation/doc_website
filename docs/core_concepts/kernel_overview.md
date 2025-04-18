# Пакет duit_kernel

Библиотека flutter_duit зависит от пакета [duit_kernel](https://github.com/Duit-Foundation/duit_kernel). Он содержит базовые интерфейсы и
классы, которые служат для стандартизации реализации базовых элементов фреймворка. Этот пакет решает
несколько важных проблем:

- Отделение интерфейсов от реализаций для более гибкой разработки.
- Предоставление возможности создавать собственные реализации фреймворка в рамках заданного контракта.
- Возможность писать собственные расширения функционала фреймворка без необходимости
  прямой зависимости от flutter_duit. [Пример](https://github.com/Duit-Foundation/duit_hetu_extension).

Подобное разделение фреймворка на две библиотеки, которые обновляются по разным причинам, создает более стабильный дизайн решения.

:::info
Начиная с версии v3.0.0 пакета duit_kernel, необходимые клиентской стороне сущности экспортируются пакетом flutter_duit. Это позволило избавиться от необходимости вручную добавлять в зависимости проекта kernel.
:::
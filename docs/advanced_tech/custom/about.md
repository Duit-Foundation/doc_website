# О пользовательских виджетах

## В чем проблема?

Экосистема пакетов Flutter помогает находить готовые решения на любой случай жизни. Многие из
публикуемых на pub.dev пакетов экспортируют в своём составе те или иные виджеты. Duit пропагандирует
dependency-free подход к разработке, подразумевающий минимизацию использования внешних зависимостей
во фреймворке. Поэтому виджеты из open-source библиотек не могут быть включены в состав библиотеки
Duit. К тому же, это потребовало бы значительных усилий на дальнейшую поддержку.

В противовес этому подходу существует требование обеспечить работу с уже разработанными виджетами (
например, использование виджетов из состава UI-кита) совместно с Duit, а также передачу данных для
их конфигурации.

## В чем состоит решение?

Duit предоставляет API для создания и регистрации специальных функций-фабрик, позволяющих
пользователям встраивать свои реализации виджетов в пайплайн обработки. Регистрация пользовательских
виджетов осуществляется с помощью статического метода класса `DuitRegistry.register`.

:::info
Зарегистрированный виджет будет доступен глобально всем экземплярам `DuitDriver`,
которые были инициализированы в приложении.
:::


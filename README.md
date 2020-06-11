#  Software Development Technologies
В этом репозитории находится реализация проекта на тему "Система управления заданиями проекта".

Онлайн версия проекта доступна онлайн по этой ссылке:
https://my-dashboard.now.sh/

К приложению была создана GraphQL база данных, доступная по открытому [EndPoint](https://my-tasks-manager.herokuapp.com/v1/graphql).
В приложении реализован клиент на базе Apollo, который реализует доступ к базе данных, получает данные через специальные хуки, находящиеся в папке utils/hooks. Полученные данные хранятся в кеше и доступны глобально по всему приложению.

Приложение позволяет создавать, просматривать и редактировать доски с задачами. Работать с группами внутри них и вести учёт задач на глобальной доске.

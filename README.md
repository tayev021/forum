# Forum

## Содержание

- [Forum](#forum)
  - [Содержание](#содержание)
  - [О проекте](#о-проекте)
    - [Цели проекта](#цели-проекта)
    - [Технологии](#технологии)
    - [Структура проекта](#структура-проекта)
      - [Клиент](#клиент)
      - [Сервер](#сервер)
      - [База Данных](#база-данных)
    - [Роли и права пользователей](#роли-и-права-пользователей)
    - [REST API Endpoints](#rest-api-endpoints)
    - [Примеры работы (скриншоты)](#примеры-работы-скриншоты)
  - [Установка](#установка)
    - [База данных](#база-данных-1)
    - [Сервер](#сервер-1)
    - [Клиент](#клиент-1)
  - [Использование](#использование)
    - [Запуск сервера](#запуск-сервера)
    - [Клиент](#клиент-2)

## О проекте

Этот проект - полнофункциональный веб-форум с клиент-серверной архитектурой.
Серверная часть реализована на Node.js + Express + TypeScript с использованием архитектуры MVC. Клиентская часть построена на React + TypeScript с использованием Redux Toolkit и React Router по принципам Feature-Sliced Design. Проект демонстрирует построение полноценного REST API с взаимодействием клиента и сервера.

Форум позволяет:

- регистрироваться и авторизоваться пользователям

- публиковать посты, редактировать, добавлять изображения

- создавать и просматривать темы

- подписываться на понравившиеся темы и получать уведомления

- выполнять поиск по постам, авторам, темам

- репортить посты, нарушающие правила

- настраивать свой профиль

- модерировать форум пользователям со специальными ролями (модератор, админ): банить посты и авторов, удалять запрещённый контент

### Цели проекта

Основная цель проекта - закрепить на практике знания по разработке fullstack-приложений.

В рамках проекта были поставлены следующие задачи:

- отработать построение REST API на Node.js + Express
- применить архитектуру MVC на сервере
- реализовать аутентификацию и авторизацию с использованием JWT + Cookie

- закрепить работу с SQL (MySQL) базой данных через ORM Sequelize

- организовать клиентское приложение по принципам Feature-Sliced Design

- использовать Redux Toolkit для управления состояниями в клиентской части

- настроить взаимодействие frontend и backend

- попрактиковаться в типизации с TypeScript как на сервере, так и на клиенте

- продумать структуру масштабируемого проекта

Проект помог закрепить на практике знания по архитектуре, организации кода, работе с авторизацией и построению масштабируемых веб-приложений.

### Технологии

Клиент:

- TypeScript
- React (Hooks, Context API, Portal и др.)
- Redux Toolkit
- React библиотеки:
  - React Router (Declarative mode)
  - Styled Components (CSS-in-JS)
  - React Hot Toast
  - React Icons
- Валидация: Zod
- Архитектура: Feature-Sliced Design
- Инструмент сборки: Vite
- ESLint, Prettier

Сервер:

- TypeScript
- Node.js
- Express.js
- Sequelize ORM
- JSON Web Token + Cookie
- Валидация: Zod
- Архитектура: MVC
- Инструмент сборки: Vite
- ESLint, Prettier

База данных:

- MySQL + MySQL Workbench

### Структура проекта

#### Клиент

```
└───client
    ├───public/...
    ├───src
    │   ├───app
    │   │   ├───providers/...
    │   │   ├───routes/...
    │   │   ├───store/...
    │   │   └───styles/...
    │   ├───entities
    │   │   ├───author/...
    │   │   ├───category/...
    │   │   ├───forum/...
    │   │   ├───post/...
    │   │   ├───report/...
    │   │   ├───statistic/...
    │   │   ├───thread/...
    │   │   └───user/...
    │   ├───features
    │   │   ├───banPost/...
    │   │   ├───banUser/...
    │   │   ├───changeAvatar/...
    │   │   ├───changePassword/...
    │   │   ├───createCategory/...
    │   │   ├───createForum/...
    │   │   ├───createThread/...
    │   │   ├───deleteAccount/...
    │   │   ├───deleteCategory/...
    │   │   ├───deleteForum/...
    │   │   ├───deletePost/...
    │   │   ├───deleteThread/...
    │   │   ├───likePost/...
    │   │   ├───rejectReport
    │   │   ├───reportPost/...
    │   │   ├───search/...
    │   │   ├───showNotifications/...
    │   │   ├───signin/...
    │   │   ├───signout/...
    │   │   ├───signup/...
    │   │   ├───sortThreads/...
    │   │   ├───subscribeThread/...
    │   │   ├───toggleTheme/...
    │   │   ├───updateBio/...
    │   │   ├───updateCategoryTitle/...
    │   │   ├───updateForumTitle/...
    │   │   ├───updatePost/...
    │   │   └───updateThreadTitle/...
    │   ├───pages
    │   │   ├───account
    │   │   │   ├───bio/...
    │   │   │   ├───notifications/...
    │   │   │   ├───posts/...
    │   │   │   ├───reports/...
    │   │   │   ├───settings/...
    │   │   │   ├───subscriptions/...
    │   │   │   └───threads/...
    │   │   ├───auth
    │   │   │   ├───signin/...
    │   │   │   └───signup/...
    │   │   ├───author
    │   │   │   └───profile/...
    │   │   ├───forum/...
    │   │   ├───home/...
    │   │   ├───pageNotFound/...
    │   │   └───thread
    │   │       ├───thread/...
    │   │       └───threadCreate/...
    │   ├───shared
    │   │   ├───assets/...
    │   │   ├───layouts
    │   │   │   ├───AccountLayout/...
    │   │   │   └───AppLayout/...
    │   │   ├───lib
    │   │   │   ├───context/...
    │   │   │   ├───hooks/...
    │   │   │   ├───utils/...
    │   │   │   └───validators/...
    │   │   ├───types/...
    │   │   └───ui
    │   │       ├───Dropdown/...
    │   │       ├───Form/...
    │   │       ├───InlineModal/...
    │   │       ├───Modal/...
    │   │       └───WidgetKit/...
    │   ├───widgets
    │   │   ├───AccountBioWidget/...
    │   │   ├───AccountDeleteWidget/...
    │   │   ├───AccountNavBarWidget/...
    │   │   ├───AccountNotificationsWidget/...
    │   │   ├───AccountPasswordWidget/...
    │   │   ├───AccountPostsWidget/...
    │   │   ├───AccountReportsWidget/...
    │   │   ├───AccountSubscriptionsWidget/...
    │   │   ├───AccountThreadsWidget/...
    │   │   ├───AuthorProfileWidget/...
    │   │   ├───CategoriesWidget/...
    │   │   ├───ForumWidget/...
    │   │   ├───LatestPostsWidget/...
    │   │   ├───NavBarWidget/...
    │   │   ├───StatisticWidget/...
    │   │   └───ThreadWidget/...
    │   └───main.tsx
    └───index.html
```

#### Сервер

```
└───server
    ├───public
    │   └───images
    │       ├───avatars/...
    │       └───posts/...
    ├───src
    │   ├───config/...
    │   ├───constants/...
    │   ├───controllers/...
    │   ├───middleware/...
    │   ├───models/...
    │   ├───routes/...
    │   ├───types/...
    │   ├───utils/...
    │   └───validators/...
    ├───app.ts
    └───server.ts
```

#### База Данных

![](readme-assets/db-diagram.jpg)

### Роли и права пользователей

|                                 | Гость | Пользователь | Модератор | Админ |
| ------------------------------- | :---: | :----------: | :-------: | :---: |
| Просмотр постов                 |  ✅   |      ✅      |    ✅     |  ✅   |
| Просмотр тем                    |  ✅   |      ✅      |    ✅     |  ✅   |
| Просмотр форумов                |  ✅   |      ✅      |    ✅     |  ✅   |
| Просмотр категории              |  ✅   |      ✅      |    ✅     |  ✅   |
| Просмотр профилей               |  ✅   |      ✅      |    ✅     |  ✅   |
| Просмотр статистики             |  ✅   |      ✅      |    ✅     |  ✅   |
| Создание поста                  |  ❌   |      ✅      |    ✅     |  ✅   |
| Создание темы                   |  ❌   |      ✅      |    ✅     |  ✅   |
| Создание форума                 |  ❌   |      ❌      |    ✅     |  ✅   |
| Создание категории              |  ❌   |      ❌      |    ✅     |  ✅   |
| Редактирование **своего** поста |  ❌   |      ✅      |    ✅     |  ✅   |
| Редактирование темы             |  ❌   |      ❌      |    ✅     |  ✅   |
| Редактирование форума           |  ❌   |      ❌      |    ✅     |  ✅   |
| Редактирование категории        |  ❌   |      ❌      |    ✅     |  ✅   |
| Удаление поста                  |  ❌   |      ❌      |    ✅     |  ✅   |
| Удаление темы                   |  ❌   |      ❌      |    ❌     |  ✅   |
| Удаление "пустого" форума       |  ❌   |      ❌      |    ❌     |  ✅   |
| Удаление "пустой" категории     |  ❌   |      ❌      |    ❌     |  ✅   |
| Удаление **своего** аккаунта    |  ❌   |      ✅      |    ❌     |  ❌   |
| Подписка на тему                |  ❌   |      ✅      |    ✅     |  ✅   |
| Лайк **чужого** поста           |  ❌   |      ✅      |    ✅     |  ✅   |
| Репорт поста                    |  ❌   |      ✅      |    ❌     |  ❌   |
| Отклонение репорта              |  ❌   |      ❌      |    ✅     |  ✅   |
| Бан поста по репорту            |  ❌   |      ❌      |    ✅     |  ✅   |
| Бан пользователя по репорту     |  ❌   |      ❌      |    ✅     |  ✅   |

### REST API Endpoints

> [!TIP]
> Сокращение для ролей:
>
> - П = пользователь
> - М = модератор
> - А = админ

| Метод  | URL                                   | Авторизован | Роли  | Комментарий                         |
| :----: | :------------------------------------ | :---------: | :---: | :---------------------------------- |
|  GET   | /api/v1/auth/me                       |     ✅      | П М А |                                     |
|  POST  | /api/v1/auth/signin                   |     ❌      |   -   |                                     |
|  POST  | /api/v1/auth/signup                   |     ❌      |   -   |                                     |
|  POST  | /api/v1/auth/signout                  |     ✅      | П М А |                                     |
|  GET   | /api/v1/users/:userId/posts           |     ❌      |   -   |                                     |
|  GET   | /api/v1/users/:userId/threads         |     ❌      |   -   |                                     |
|  GET   | /api/v1/users/subscriptions           |     ✅      | П М А | **Персональные** подписки           |
|  GET   | /api/v1/users/notifications           |     ✅      | П М А | **Персональные** уведомления        |
| PATCH  | /api/v1/users/bio                     |     ✅      | П М А | Обновление **своей** биографии      |
| PATCH  | /api/v1/users/password                |     ✅      | П М А | Изменение **своего** пароля         |
| PATCH  | /api/v1/users/avatar                  |     ✅      | П М А | Изменение **своего** аватара        |
| DELETE | /api/v1/users                         |     ✅      |   П   | Удаление **своего** аккаунта        |
|  GET   | /api/v1/authors/:authorId/profile     |     ❌      |   -   |                                     |
|  GET   | /api/v1/authors/search                |     ❌      |   -   |                                     |
|  GET   | /api/v1/posts/latest                  |     ❌      |   -   |                                     |
|  GET   | /api/v1/posts/search                  |     ❌      |   -   |                                     |
|  POST  | /api/v1/posts                         |     ✅      | П М А |                                     |
|  POST  | /api/v1/posts/:postId/like            |     ✅      | П М А | Лайк поста **другого** автора       |
|  POST  | /api/v1/posts/:postId/report          |     ✅      |   П   | Репорт поста **другого** автора     |
| DELETE | /api/v1/posts/:postId                 |     ✅      |  М А  |                                     |
| DELETE | /api/v1/attachments/:attachmentId     |     ✅      | П М А | Удаление вложений в **своем** посте |
|  GET   | /api/v1/threads/search                |     ❌      |   -   |                                     |
|  GET   | /api/v1/threads/:threadId             |     ❌      |   -   |                                     |
|  POST  | /api/v1/threads                       |     ✅      | П М А |                                     |
|  POST  | /api/v1/threads/:threadId/subscribe   |     ✅      | П М А |                                     |
|  POST  | /api/v1/threads/:threadId/unsubscribe |     ✅      | П М А |                                     |
| PATCH  | /api/v1/threads/:threadId             |     ✅      |  М А  |                                     |
| DELETE | /api/v1/threads/:threadId             |     ✅      |   А   |                                     |
|  GET   | /api/v1/forums/:forumId               |     ❌      |   -   |                                     |
|  POST  | /api/v1/forums                        |     ✅      |  М А  |                                     |
| PATCH  | /api/v1/forums/:forumId               |     ✅      |  М А  |                                     |
| DELETE | /api/v1/forums/:forumId               |     ✅      |   А   |                                     |
|  GET   | /api/v1/categories                    |     ❌      |   -   |                                     |
|  POST  | /api/v1/categories                    |     ✅      |  М А  |                                     |
| PATCH  | /api/v1/categories/:categoryId        |     ✅      |  М А  |                                     |
| DELETE | /api/v1/categories/:categoryId        |     ✅      |   А   |                                     |
|  GET   | /api/v1/reports                       |     ✅      |  М А  |                                     |
|  POST  | /api/v1/reports/:reportId/reject      |     ✅      |  М А  |                                     |
|  POST  | /api/v1/reports/:reportId/ban/post    |     ✅      |  М А  |                                     |
|  POST  | /api/v1/reports/:reportId/ban/user    |     ✅      |  М А  |                                     |
|  GET   | /api/v1/statistic                     |     ❌      |   -   |                                     |

### Примеры работы (скриншоты)

Демонстрация адаптивного дизайна с переключением светлой и темной темы:

![](readme-assets/start-wide-screen.gif)
![](readme-assets/start-tablet-mobile-screen.gif)

Регистрация пользователя с валидацией на стороне клиента и сервера:

![](readme-assets/signup.gif)

Изменение аватара и биографии в аккаунте:

![](readme-assets/update-avatar-bio.gif)

Создание новой темы и первого поста с прикреплением изображений:

![](readme-assets/create-thread.gif)

Редактирование поста - изменение текста, выборочное удаление прикрепленных изображений и добавление новых:

![](readme-assets/update-post.gif)

Лайк постов и подписка на тему:

![](readme-assets/like-subscribe.gif)

Пользователь получает уведомление, если в подписанной теме появляется новый пост. Уведомления отображаются на панели и на странице аккаунта. При нажатии на уведомление открывается страница темы с первым непрочитанным постом, страница проматывается к нему:

![](readme-assets/notifications.gif)

Пример репорта постов:

![](readme-assets/report.gif)

Администратор (или модератор) рассматривает репорты и может отвергать их, банить пост или пользователя. В репорте отображается информация о причине, времени, репортёре и о самом посте:

![](readme-assets/report-review.gif)

Доступен поиск по всем постам, темам, авторам:

![](readme-assets/search.gif)

Администратор может создавать, редактировать категории и форумы, удалять пустые:

![](readme-assets/categories.gif)

## Установка

### База данных

> [!NOTE]
> Для работы с MySQL необходимо установить MySQL Server и MySQL Workbench.

> [!NOTE]
> Оставить по умолчанию адрес сервера `localhost:3306`, соединение с `User: root` и `Password: 1111`.
>
> Если адрес/порт или User/Password другой, необходимо обновить на сервере файл `.env` с соответствующими полями.

Для импорта схем и данных БД необходимо:

1. В MySQL Workbench установить соединение с `User: root` и `Password: 1111`
2. Открыть `Server` -> `Data Import`
3. Отметить `Import from Self-Contained File`
4. Выбрать файл `/db-backup/forum-db-backup.sql`
5. В разделе `Default Target Schema` нажать `New…` и создать новую схему с именем `forum`
6. Далее выбрать `Import Progress` нажать `Start Import`

### Сервер

Перейти в папку `server` из корня проекта:

```
cd server
```

Для установки зависимостей:

```
npm i
```

### Клиент

Перейти в папку `client` из корня проекта:

```
cd client
```

Для установки зависимостей:

```
npm i
```

## Использование

### Запуск сервера

Перейти в папку `server` из корня проекта. Запустить сервер:

```
npm run dev
```

> [!TIP]
> По умолчанию адрес сервера `localhost:3000`

### Клиент

Перейти в папку `client` из корня проекта. Выполнить:

```
npm run dev
```

> [!TIP]
> По умолчанию в браузере можно открыть по адресу `localhost:5173`

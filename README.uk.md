# Forum

[ [English](README.md) | [**Ukrainian**](README.uk.md) | [Russian](README.ru.md) ]

## Зміст

- [Forum](#forum)
  - [Зміст](#зміст)
  - [Про проєкт](#про-проєкт)
    - [Цілі проєкту](#цілі-проєкту)
    - [Технології](#технології)
    - [Структура проєкту](#структура-проєкту)
      - [Client](#client)
      - [Server](#server)
      - [База даних](#база-даних)
    - [Ролі та права користувачів](#ролі-та-права-користувачів)
    - [REST API Endpoints](#rest-api-endpoints)
    - [Приклади роботи (скріншоти)](#приклади-роботи-скріншоти)
  - [Встановлення](#встановлення)
    - [База даних](#база-даних-1)
    - [Сервер](#сервер)
    - [Клієнт](#клієнт)
  - [Використання](#використання)
    - [Запуск сервера](#запуск-сервера)
    - [Клієнт](#клієнт-1)

## Про проєкт

Цей проєкт - повнофункціональний веб-форум із клієнт-серверною архітектурою.
Серверна частина реалізована на Node.js + Express + TypeScript з використанням архітектури MVC. Клієнтська частина побудована на React + TypeScript з використанням Redux Toolkit та React Router, організована відповідно до принципів Feature-Sliced Design.

Проєкт демонструє побудову повноцінного REST API із взаємодією клієнта та сервера.

Форум дозволяє:

- реєструватися та авторизуватися користувачам

- публікувати пости, редагувати їх та додавати зображення

- створювати та переглядати теми

- підписуватися на улюблені теми та отримувати сповіщення

- виконувати пошук за постами, авторами та темами

- скаржитися на пости, що порушують правила

- налаштовувати свій профіль

- модерувати форум користувачам зі спеціальними ролями (модератор, адміністратор): блокувати пости та авторів, видаляти заборонений контент

### Цілі проєкту

Основна мета цього проєкту — закріпити на практиці знання з розробки fullstack-застосунків.

У межах проєкту були поставлені такі завдання:

- відпрацювати створення REST API на Node.js + Express

- застосувати архітектуру MVC на сервері

- реалізувати аутентифікацію та авторизацію з використанням JWT + Cookie

- закріпити роботу з SQL-базою даних (MySQL) через ORM Sequelize

- організувати клієнтський застосунок за принципами Feature-Sliced Design

- використовувати Redux Toolkit для керування станом у клієнтській частині

- налаштувати взаємодію між frontend та backend

- попрактикуватися у типізації TypeScript як на сервері, так і на клієнті

- продумати структуру масштабованого проєкту

Цей проєкт допоміг закріпити на практиці знання з архітектури, організації коду, роботи з авторизацією та побудови масштабованих веб-застосунків.

### Технології

Client:

- TypeScript
- React (Hooks, Context API, Portal тощо)
- Redux Toolkit
- React бібліотеки:
  - React Router (Declarative mode)
  - Styled Components (CSS-in-JS)
  - React Hot Toast
  - React Icons
- Валідація: Zod
- Архітектура: Feature-Sliced Design
- Інструменти: Vite
- ESLint, Prettier

Server:

- TypeScript
- Node.js
- Express.js
- Sequelize ORM
- JSON Web Token + Cookie
- Валідація: Zod
- Архітектура: MVC
- Інструменти: Vite
- ESLint, Prettier

База даних:

- MySQL + MySQL Workbench

### Структура проєкту

#### Client

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

#### Server

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

#### База даних

![](readme-assets/db-diagram.jpg)

### Ролі та права користувачів

|                                   | Гість | Користувач | Модератор | Адміністратор |
| --------------------------------- | :---: | :--------: | :-------: | :-----------: |
| Перегляд постів                   |  ✅   |     ✅     |    ✅     |      ✅       |
| Перегляд тем                      |  ✅   |     ✅     |    ✅     |      ✅       |
| Перегляд форумів                  |  ✅   |     ✅     |    ✅     |      ✅       |
| Перегляд категорій                |  ✅   |     ✅     |    ✅     |      ✅       |
| Перегляд профілів                 |  ✅   |     ✅     |    ✅     |      ✅       |
| Перегляд статистики               |  ✅   |     ✅     |    ✅     |      ✅       |
| Створення поста                   |  ❌   |     ✅     |    ✅     |      ✅       |
| Створення теми                    |  ❌   |     ✅     |    ✅     |      ✅       |
| Створення форуму                  |  ❌   |     ❌     |    ✅     |      ✅       |
| Створення категорії               |  ❌   |     ❌     |    ✅     |      ✅       |
| Редагування **власного** поста    |  ❌   |     ✅     |    ✅     |      ✅       |
| Редагування теми                  |  ❌   |     ❌     |    ✅     |      ✅       |
| Редагування форуму                |  ❌   |     ❌     |    ✅     |      ✅       |
| Редагування категорії             |  ❌   |     ❌     |    ✅     |      ✅       |
| Видалення поста                   |  ❌   |     ❌     |    ✅     |      ✅       |
| Видалення теми                    |  ❌   |     ❌     |    ❌     |      ✅       |
| Видалення "порожнього" форуму     |  ❌   |     ❌     |    ❌     |      ✅       |
| Видалення "порожньої" категорії   |  ❌   |     ❌     |    ❌     |      ✅       |
| Видалення **власного** акаунта    |  ❌   |     ✅     |    ❌     |      ❌       |
| Підписка на тему                  |  ❌   |     ✅     |    ✅     |      ✅       |
| Лайк **чужого** поста             |  ❌   |     ✅     |    ✅     |      ✅       |
| Скарга на пост                    |  ❌   |     ✅     |    ❌     |      ❌       |
| Відхилення скарги                 |  ❌   |     ❌     |    ✅     |      ✅       |
| Блокування поста за скаргою       |  ❌   |     ❌     |    ✅     |      ✅       |
| Блокування користувача за скаргою |  ❌   |     ❌     |    ✅     |      ✅       |

### REST API Endpoints

> [!TIP]
> Скорочення для ролей:
>
> - К = користувач
> - М = модератор
> - А = адміністратор

| Метод  | URL                                   | Авторизований | Ролі  | Коментар                              |
| :----: | :------------------------------------ | :-----------: | :---: | :------------------------------------ |
|  GET   | /api/v1/auth/me                       |      ✅       | К М А |                                       |
|  POST  | /api/v1/auth/signin                   |      ❌       |   -   |                                       |
|  POST  | /api/v1/auth/signup                   |      ❌       |   -   |                                       |
|  POST  | /api/v1/auth/signout                  |      ✅       | К М А |                                       |
|  GET   | /api/v1/users/:userId/posts           |      ❌       |   -   |                                       |
|  GET   | /api/v1/users/:userId/threads         |      ❌       |   -   |                                       |
|  GET   | /api/v1/users/subscriptions           |      ✅       | К М А | **Персональні** підписки              |
|  GET   | /api/v1/users/notifications           |      ✅       | К М А | **Персональні** повідомлення          |
| PATCH  | /api/v1/users/bio                     |      ✅       | К М А | Оновлення **своєї** біографії         |
| PATCH  | /api/v1/users/password                |      ✅       | К М А | Зміна **свого** пароля                |
| PATCH  | /api/v1/users/avatar                  |      ✅       | К М А | Зміна **свого** аватара               |
| DELETE | /api/v1/users                         |      ✅       |   К   | Видалення **свого** акаунта           |
|  GET   | /api/v1/authors/:authorId/profile     |      ❌       |   -   |                                       |
|  GET   | /api/v1/authors/search                |      ❌       |   -   |                                       |
|  GET   | /api/v1/posts/latest                  |      ❌       |   -   |                                       |
|  GET   | /api/v1/posts/search                  |      ❌       |   -   |                                       |
|  POST  | /api/v1/posts                         |      ✅       | К М А |                                       |
|  POST  | /api/v1/posts/:postId/like            |      ✅       | К М А | Лайк посту **іншого** автора          |
|  POST  | /api/v1/posts/:postId/report          |      ✅       |   К   | Репорт посту **іншого** автора        |
| DELETE | /api/v1/posts/:postId                 |      ✅       |  М А  |                                       |
| DELETE | /api/v1/attachments/:attachmentId     |      ✅       | К М А | Видалення вкладень у **своєму** пості |
|  GET   | /api/v1/threads/search                |      ❌       |   -   |                                       |
|  GET   | /api/v1/threads/:threadId             |      ❌       |   -   |                                       |
|  POST  | /api/v1/threads                       |      ✅       | К М А |                                       |
|  POST  | /api/v1/threads/:threadId/subscribe   |      ✅       | К М А |                                       |
|  POST  | /api/v1/threads/:threadId/unsubscribe |      ✅       | К М А |                                       |
| PATCH  | /api/v1/threads/:threadId             |      ✅       |  М А  |                                       |
| DELETE | /api/v1/threads/:threadId             |      ✅       |   А   |                                       |
|  GET   | /api/v1/forums/:forumId               |      ❌       |   -   |                                       |
|  POST  | /api/v1/forums                        |      ✅       |  М А  |                                       |
| PATCH  | /api/v1/forums/:forumId               |      ✅       |  М А  |                                       |
| DELETE | /api/v1/forums/:forumId               |      ✅       |   А   |                                       |
|  GET   | /api/v1/categories                    |      ❌       |   -   |                                       |
|  POST  | /api/v1/categories                    |      ✅       |  М А  |                                       |
| PATCH  | /api/v1/categories/:categoryId        |      ✅       |  М А  |                                       |
| DELETE | /api/v1/categories/:categoryId        |      ✅       |   А   |                                       |
|  GET   | /api/v1/reports                       |      ✅       |  М А  |                                       |
|  POST  | /api/v1/reports/:reportId/reject      |      ✅       |  М А  |                                       |
|  POST  | /api/v1/reports/:reportId/ban/post    |      ✅       |  М А  |                                       |
|  POST  | /api/v1/reports/:reportId/ban/user    |      ✅       |  М А  |                                       |
|  GET   | /api/v1/statistic                     |      ❌       |   -   |                                       |

### Приклади роботи (скріншоти)

Демонстрація адаптивного дизайну з перемиканням світлої та темної теми:

![](readme-assets/start-wide-screen.gif)
![](readme-assets/start-tablet-mobile-screen.gif)

Реєстрація користувача з валідацією на стороні клієнта та сервера:

![](readme-assets/signup.gif)

Зміна аватара та біографії в акаунті:

![](readme-assets/update-avatar-bio.gif)

Створення нової теми та першого поста з прикріпленням зображень:

![](readme-assets/create-thread.gif)

Редагування поста - зміна тексту, вибіркове видалення прикріплених зображень та додавання нових:

![](readme-assets/update-post.gif)

Лайк постів та підписка на тему:

![](readme-assets/like-subscribe.gif)

Користувач отримує сповіщення, якщо в підписаній темі з’являється новий пост. Сповіщення відображаються на панелі та на сторінці акаунта. При натисканні на сповіщення відкривається сторінка теми з першим непрочитаним постом, і сторінка прокручується до нього:

![](readme-assets/notifications.gif)

Приклад скарги на пости:

![](readme-assets/report.gif)

Адміністратор (або модератор) розглядає скарги та може відхилити їх, заблокувати пост або користувача. У скарзі відображається інформація про причину, час, автора скарги та сам пост:

![](readme-assets/report-review.gif)

Доступний пошук за всіма постами, темами та авторами:

![](readme-assets/search.gif)

Адміністратор може створювати та редагувати категорії й форуми, а також видаляти порожні:

![](readme-assets/categories.gif)

## Встановлення

### База даних

> [!NOTE]
> Для роботи з MySQL необхідно встановити MySQL Server та MySQL Workbench.

> [!NOTE]
> Залиште адресу сервера за замовчуванням `localhost:3306`, із підключенням `User: root` та `Password: 1111`.
>
> Якщо адреса/порт або User/Password відрізняються, необхідно оновити файл `.env` на сервері з відповідними полями.

Щоб імпортувати схему та дані бази даних:

1. У MySQL Workbench створіть підключення з `User: root` та `Password: 1111`
2. Відкрийте `Server` -> `Data Import`
3. Виберіть `Import from Self-Contained File`
4. Оберіть файл `/db-backup/forum-db-backup.sql`
5. У розділі `Default Target Schema` натисніть `New…` та створіть нову схему з назвою `forum`
6. Потім виберіть `Import Progress` та натисніть `Start Import`

### Сервер

Перейдіть у папку `server` з кореня проєкту:

```
cd server
```

Встановіть залежності:

```
npm i
```

### Клієнт

Перейдіть у папку `client` з кореня проєкту:

```
cd client
```

Встановіть залежності:

```
npm i
```

## Використання

### Запуск сервера

Перейдіть у папку `server` з кореня проєкту та запустіть сервер:

```
npm run dev
```

> [!TIP]
> За замовчуванням адреса сервера `localhost:3000`

### Клієнт

Перейдіть у папку `client` з кореня проєкту та виконайте:

```
npm run dev
```

> [!TIP]
> За замовчуванням застосунок можна відкрити у браузері за адресою `localhost:5173`

export default {
  ru: {
    translation: {
      chat: {
        send: 'Отправить',
        placeholder: 'Введите сообщение...',
        ariaLabel: 'Новое сообщение',
      },
      messages: {
        messagesCounter: {
          messagesCount_zero: '{{count}} сообщений',
          messagesCount_one: '{{count}} сообщение',
          messagesCount_few: '{{count}} сообщения',
          messagesCount_many: '{{count}} сообщений',
        },
      },
      channels: {
        channels: 'Каналы',
        add: '+',
        channelManagement: 'Управление каналом',
        dropdownToggle: {
          remove: 'Удалить',
          rename: 'Переименовать',
        },
      },
      modals: {
        sendButton: 'Отправить',
        cancelButton: 'Отменить',
        removeButton: 'Удалить',
        channelName: 'Имя канала',
        addChannel: 'Добавить канал',
        renameChannel: 'Переименовать канал',
        removeChannel: 'Удалить канал',
        question: 'Уверены?',
      },
      errors: {
        required: 'Обязательное поле',
        symbolsLength: 'От 3 до 20 символов',
        mustBeUnique: 'Должно быть уникальным',
        minPasswordLength: 'Не менее 6 символов',
        confirmPassword: 'Пароли должны совпадать',
        authorizationError: 'Такой пользователь уже существует',
        loginError: 'Неверные имя пользователя или пароль',
        toastAddChannel: 'Ошибка при создании канала',
        toastRenameChannel: 'Ошибка при переименовании канала',
        toastRemoveChannel: 'Ошибка при удалении канала',
        authError: 'Ошибка авторизации',
        loadDataError: 'Ошибка загрузки данных',
        server: 'Ошибка соединения',
      },
      signUpPage: {
        altText: 'Регистрация',
      },
      signUpForm: {
        h1: 'Регистрация',
        usernameLabel: 'Имя пользователя',
        passwordLabel: 'Пароль',
        confirmPasswordLabel: 'Подтвердите пароль',
        registrationButton: 'Зарегистрироваться',
      },
      loginPage: {
        altText: 'Войти',
        question: 'Нет аккаунта? ',
        signUpLink: 'Регистрация',
      },
      loginForm: {
        h1: 'Войти',
        usernameLabel: 'Ваш ник',
        passwordLabel: 'Пароль',
        loginButton: 'Войти',
      },
      notFoundPage: {
        h1: '404 - Страница не найдена',
        altText: 'Страница не найдена',
        p: 'Но вы можете перейти ',
        a: 'на главную страницу',
      },
      header: {
        navbarBrand: 'Hexlet Chat',
        signOutButton: 'Выйти',
      },
      toast: {
        addChannel: 'Канал создан',
        renameChannel: 'Канал переименован',
        removeChannel: 'Канал удалён',
      },
    },
  },
}

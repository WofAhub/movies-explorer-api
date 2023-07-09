// const база
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

// const мидлвары
const authMiddleware = require('./middlewares/authMiddleware');
const limiter = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

// const utils
const { DATABASE_URL } = require('./utils/const');

// const роуты
const usersAndMoviesRoutes = require('./routes/routes');
const authAndRegRouter = require('./routes/authorization');
// const роут ошибка 404
const error404 = require('./routes/error404');

// const сервер
const { PORT = 3000 } = process.env;
const app = express();

// app.use база
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors);

// логгер запросов
app.use(requestLogger);

// лимитер
app.use(limiter);

// app.get краш-тест
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// app.use логин и регистрация
app.use(authAndRegRouter);

// app.use защита авторизацией
app.use(authMiddleware);

// app.use роуты юзеров и фильмов
app.use(usersAndMoviesRoutes);

// app.use ошибка 404
app.use(error404);

// логгер ошибок
app.use(errorLogger);

// обработчик ошибок селебрейт
app.use(errors());

// app.use дефолтный обработчик ошибок
app.use(errorHandler);

// подсоединение к mongoose -> подключение к серверу
mongoose.connect(DATABASE_URL)
  .then(() => {
    console.log('Подключение к базе состоялось');
    app.listen(PORT, () => {
      console.log(`Приложение прослушивается на порте ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Ошибка подключения к базе', err);
    process.exit();
  });

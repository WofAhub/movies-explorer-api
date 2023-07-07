// const база
const express = require('express');
const mongoose = require('mongoose');

// const мидлвары
const errorHandler = require('./middlewares/errorHandler');

// const роуты
const moviesRouter = require('./routes/movies');
const usersRouter = require('./routes/users');
const authAndRegRouter = require('./routes/authorization');

// const роут ошибка 404
const error404 = require('./routes/error404');

// const сервер
const { PORT = 3000 } = process.env;
const app = express();

// app.get краш-тест
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// app.use роуты
app.use(authAndRegRouter);
app.use(usersRouter);
app.use(moviesRouter);

// app.use ошибка 404
app.use(error404);

// app.use дефолтный обработчик ошибок
app.use(errorHandler);

// подсоединение к mongoose -> подключение к серверу
mongoose.connect('mongodb://127.0.0.1:27017/moviesdb')
  .then(() => {
    console.log('🟢 Подключение к базе состоялось'); // eslint-disable-line

    app.listen(PORT, () => {
      console.log(`🔵 Приложение прослушивается на порте ${PORT}`); // eslint-disable-line
    });
  })

  .catch((err) => {
    console.log('🔴 Ошибка подключения к базе', err); // eslint-disable-line

    process.exit();
  });

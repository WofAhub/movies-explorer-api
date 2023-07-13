// const база
const router = require('express').Router();

// const роуты
const userRouter = require('./users');
const movieRouter = require('./movies');
const authAndRegRouter = require('./authAndReg');
const authMiddleware = require('../middlewares/authMiddleware');
const error404 = require('./error404');

// router.use роуты регистрации и логина
router.use(authAndRegRouter);

// router.use роут, защищающий авторизацией
router.use(authMiddleware);

// router.use роуты пользователя и фильмов
router.use(userRouter);
router.use(movieRouter);
router.use(error404);

module.exports = router;

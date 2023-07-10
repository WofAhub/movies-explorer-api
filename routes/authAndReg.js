// const база
const router = require('express').Router();

// const мидлвары валидация
const {
  validationLogin,
  validationRegistration,
} = require('../middlewares/validation');

// const контроллер
const {
  login,
  registration,
} = require('../controllers/users');

// роуты
router.post('/signin', validationLogin, login);
router.post('/signup', validationRegistration, registration);

module.exports = router;

// const база
const router = require('express').Router();

// const мидлвары валидация
const {
  validationUpdateUser,
} = require('../middlewares/validation');

// const контроллер
const {
  updateUser,
  getMe,
} = require('../controllers/users');

// роуты
router.get('/users/me', getMe);
router.patch('/users/me', validationUpdateUser, updateUser);

module.exports = router;

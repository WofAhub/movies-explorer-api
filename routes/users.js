// const база
const router = require('express').Router();

// const контроллер
const {
  updateUser,
  getMe,
} = require('../controllers/users');

// роуты
router.get('/users/me', getMe);
router.patch('/users/me', updateUser);

module.exports = router;

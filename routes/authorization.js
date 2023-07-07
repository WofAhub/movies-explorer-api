// const база
const router = require('express').Router();

// const контроллер
const {
  login,
  register,
} = require('../controllers/users');

// роуты
router.post('/signin', login);
router.post('/signup', register);

module.exports = router;

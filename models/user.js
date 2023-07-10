// const база
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// const ошибки
const UnauthorizedError = require('../errors/UnauthorizedError');
const { EMAIL_REGEX } = require('../utils/config');

// схема пользователя
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'В имени должно быть от 2-х символов до 30-ти. Сейчас меньше 2-х'],
    maxlength: [30, 'В имени должно быть до 30-ти символов. Сейчас больше 30-ти'],
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (email) => EMAIL_REGEX.test(email),
      message: 'Email не соответвует стандарту',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// статик
userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('🔑 Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('🔑 Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);

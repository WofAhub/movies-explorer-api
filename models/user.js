// const база
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

// const ошибки
const UnauthorizedError = require('../errors/UnauthorizedError');

// схема пользователя
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (string) => {
        validator.isEmail(string);
      },
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

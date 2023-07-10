// const база
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// const, связанный с env
const { NODE_ENV, JWT_SECRET } = process.env;

// const ошибки
const {
  NotFoundError,
  ValidationError,
  DublicateError,
  MONGO_DUBLICATE_ERROR,
} = require('../utils/errors');

// соль
const { SAULT_ROUNDS } = require('../utils/config');

// регистрация
module.exports.registration = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, SAULT_ROUNDS)
    .then((hash) => User
      .create(
        {
          name,
          email,
          password: hash,
        },
      ))
    .then((user) => {
      res.status(201)
        .send({
          _id: user._id,
          name: user.name,
          email: user.email,
        });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        const errorFields = Object.keys(err.errors);
        const errorMessage = err.errors[errorFields[0]].message;

        next(new ValidationError(errorMessage));
      } else if (err.code === MONGO_DUBLICATE_ERROR) {
        next(new DublicateError('Пользователь с таким email уже существует'));
      } else {
        next(err);
      }
    });
};

// авторизация
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return (
    User
      .findUserByCredentials(email, password)
      .then((user) => {
        const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
        return res.status(200).send({ token });
      })
      .catch((err) => {
        next(err);
      })
  );
};

// поиск меня
module.exports.getMe = (req, res, next) => {
  User
    .findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('👀 Пользователь не найден');
    })
    .then((user) => res
      .status(200)
      .send(user))

    .catch((err) => {
      next(err);
    });
};

// обновление информации о пользователе
module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User
    .findByIdAndUpdate(
      req.user._id,
      {
        name,
        email,
      },
      {
        new: true,
        runValidators: true,
        upsert: false,
      },
    )
    .then((user) => {
      res
        .status(200)
        .send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        const errorFields = Object.keys(err.errors);
        const errorMessage = err.errors[errorFields[0]].message;

        next(new ValidationError(errorMessage));
      } else if (err.code === MONGO_DUBLICATE_ERROR) {
        next(new DublicateError('Поле Email повторяет текущий email'));
      } else {
        next(err);
      }
    });
};

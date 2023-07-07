// const база
const User = require('../models/user');

// const ошибки
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ValidationMongooseError = require('../errors/ValidationMongooseError');

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
      if (err.name === 'CastError') {
        next(new ValidationError('❓ Некорректный id пользователя'));
      } else {
        next(err);
      }
    });
};

// обновление информации о пользователе
module.exports.updateUser = (req, res, next) => {
  const { name } = req.body;

  User
    .findByIdAndUpdate(req.user._id, { name })
    .then((user) => {
      res
        .status(200)
        .send(user);
    })
    .catch((err) => {
      ValidationMongooseError(err, next);
    });
};

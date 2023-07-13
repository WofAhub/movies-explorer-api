// const база
const mongoose = require('mongoose');
const Movie = require('../models/movie');

// const ошибки
const {
  NotFoundError,
  ValidationError,
  ForbiddenError,
} = require('../utils/errors');

// получение всех фильмов
module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;

  Movie
    .find({ owner })
    .populate('owner')
    .then((movies) => {
      res
        .status(200)
        .send(movies);
    })
    .catch((err) => {
      next(err);
    });
};

// добавление фильма
module.exports.uploadMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
      owner: req.user._id,
    })
    .then((movie) => {
      movie
        .populate('owner');
      res
        .status(200)
        .send(movie);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        const errorFields = Object.keys(err.errors);
        const errorMessage = err.errors[errorFields[0]].message;

        next(new ValidationError(errorMessage));
      } else {
        next(err);
      }
    });
};

// удаление фильма
module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movie
    .findById(movieId)
    .orFail(() => {
      throw new NotFoundError('👀 Фильм не найден');
    })
    .then((MovieThatIsBeingDeleted) => {
      const idMovie = MovieThatIsBeingDeleted.owner.toString();
      const idUser = req.user._id.toString();
      if (idMovie === idUser) {
        Movie
          .deleteOne(MovieThatIsBeingDeleted)
          .then(() => {
            res
              .status(200)
              .send({ message: '❎ Фильм удалён' });
          });
      } else {
        throw new ForbiddenError('⛔ Вы не можете удалить фильм, добавленный не Вами');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('❓ Некорректный id фильма'));
      } else {
        next(err);
      }
    });
};

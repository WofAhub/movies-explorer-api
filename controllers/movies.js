// const база
const Movie = require('../models/movie');

// const ошибки
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ValidationMongooseError = require('../errors/ValidationMongooseError');
const ForbiddenError = require('../errors/ForbiddenError');

// получение всех фильмов
module.exports.getMovies = (req, res, next) => {
  Movie
    .find({})
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
      res
        .status(200)
        .send(movie);
    })
    .catch((err) => {
      ValidationMongooseError(err, next);
    });
};

// удаление фильма
module.exports.deleteMovie = (req, res, next) => {
  Movie
    .findById(req.params.id)
    .orFail(() => {
      throw new NotFoundError('👀 Фильм не найден');
    })
    .then((MovieThatIsBeingDeleted) => {
      if (req.params.id === req.user._id) {
        Movie
          .deleteOne(MovieThatIsBeingDeleted)
          .then(() => {
            res
              .status(200)
              .send({ message: '❎ Фильм удалён' });
          });
      } else {
        throw new ForbiddenError('❌ Вы не можете удалить фильм, добавленный не Вами');
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

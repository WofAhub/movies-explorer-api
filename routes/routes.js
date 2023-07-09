// const база
const router = require('express').Router();

// const мидлвары валидация
const {
  validationUpdateUser,
  validationUploadMovie,
  validationMovieId,
} = require('../middlewares/validation');

// const контроллер
const {
  updateUser,
  getMe,
} = require('../controllers/users');

// const контроллер
const {
  deleteMovie,
  uploadMovie,
  getMovies,
} = require('../controllers/movies');

// роуты юзер
router.get('/users/me', getMe);
router.patch('/users/me', validationUpdateUser, updateUser);

// роуты фильмы
router.get('/movies', getMovies);
router.post('/movies', validationUploadMovie, uploadMovie);
router.delete('/movies/:movieId', validationMovieId, deleteMovie);

module.exports = router;

// const база
const router = require('express').Router();

// const мидлвары валидация
const {
  validationUploadMovie,
  validationMovieId,
} = require('../middlewares/validation');

// const контроллер
const {
  deleteMovie,
  uploadMovie,
  getMovies,
} = require('../controllers/movies');

// роуты
router.get('/movies', getMovies);
router.post('/movies', validationUploadMovie, uploadMovie);
router.delete('/movies/:movieId', validationMovieId, deleteMovie);

module.exports = router;

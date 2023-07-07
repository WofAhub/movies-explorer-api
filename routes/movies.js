// const база
const router = require('express').Router();

// const контроллер
const {
  deleteMovie,
  uploadMovie,
  getMovies,
} = require('../controllers/movies');

// роуты
router.get('/movies', getMovies);
router.post('/movies', uploadMovie);
router.delete('/movies/_id', deleteMovie);

module.exports = router;

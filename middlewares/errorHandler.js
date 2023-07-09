// дефолтный обработчик ошибок
const errorHandler = (err, req, res, next) => {
  console.log('Дефолтный обработчик ошибок', err);
  const { statusCode = 500, message = 'Ошибка' } = err;
  res.status(statusCode).send({ message });
};

module.exports = errorHandler;

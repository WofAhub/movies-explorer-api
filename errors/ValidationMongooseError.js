const mongoose = require('mongoose');
const ValidationError = require('./ValidationError');

module.exports.ValidationMongooseError = (err, next) => {
  if (err instanceof mongoose.Error.ValidationError) {
    const errorFields = Object.keys(err.errors);
    const errorMessage = err.errors[errorFields[0]].message;

    next(new ValidationError(errorMessage));
  } else {
    next(err);
  }
};

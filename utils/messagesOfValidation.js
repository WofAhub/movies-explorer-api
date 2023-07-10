const name = {
  'string.empty': 'Поле Имя должно быть заполнено',
  'string.min': 'В имени должно быть от 2-х символов до 30-ти. Сейчас меньше 2-х',
  'string.max': 'В имени должно быть до 30-ти символов. Сейчас больше 30-ти',
  'string.required': 'Поле с именем обязательное',
};

const email = {
  'string.email': 'Email не соответсвует стандарту',
  'string.empty': 'Поле Email должно быть заполнено',
  'string.required': 'Поле с email обязательное',
};

const password = {
  'string.empty': 'Поле с паролем должно быть заполнено',
  'string.required': 'Поле с паролем обязательное',
};

const link = {
  'string.empty': 'Все поля ссылок должны быть заполнены',
  'string.uri': 'Ссылка не соответсвует стандарту',
  'string.required': 'Поле с ссылкой  обязательное',
};

const nameMovie = {
  'string.empty': 'Все поля с названием фильма должны быть заполнены',
  'string.required': 'Поле с названием фильма обязательное',
};

const description = {
  'string.empty': 'Поле с описанием фильма должно быть заполнено',
  'string.required': 'Поле с описанием фильма обязательное',
};

const number = {
  'number.base': 'Поля с годом выхода фильма и его продолжительностью должны быть в цифрах',
  'number.empty': 'Поля с годом выхода фильма и его продолжительностью должны быть заполнены',
  'number.required': 'Поля с годом выхода фильма и его продолжительностью обязательные',
};

const country = {
  'string.empty': 'Поле со страной фильма должно быть заполнено',
  'string.required': 'Поле со страной фильма обязательное',
};

const director = {
  'string.empty': 'Поле с режиссером фильма должно быть заполнено',
  'string.required': 'Поле с режиссером фильма обязательное',
};

const movieId = {
  'string.hex': 'Id фильма должен быть в шестнадцатиричном формате',
  'string.length': 'Id фильма должен состоять из 24 символов',
  'string.required': 'Введите Id фильма',
};

module.exports = {
  name,
  email,
  password,
  link,
  nameMovie,
  description,
  number,
  country,
  director,
  movieId,
};

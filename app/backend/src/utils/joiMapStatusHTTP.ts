type JoiMapStatusHTTP = {
  [key: string]: number;
};

const joiMapStatusHTTP: Readonly<JoiMapStatusHTTP> = {
  'any.string': 400,
  'any.required': 400,
  'string.empty': 400,
  'string.min': 401,
  'string.email': 401,
  'number.min': 401,
};

export default joiMapStatusHTTP;

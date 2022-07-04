import sequelize from 'sequelize';

const { ValidationError } = sequelize;

const validateError = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(422).send({
      error: err.message,
    });
    return;
  }
  next(err);
};

export default validateError;

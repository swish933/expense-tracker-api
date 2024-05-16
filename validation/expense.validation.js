const joi = require('joi');

const signupValidation = async (req, res, next) => {
  try {
    const schema = joi.object({
      email: joi.string().email().required(),
      username: joi.string(),
      password: joi.string().min(6).required(),
      confirmPassword: joi
        .any()
        .valid(joi.ref('password'))
        .required()
        .error(new Error('Passwords do not match')),
    });

    await schema.validateAsync(req.body);

    next();
  } catch (error) {
    return res.status(422).json({ message: error.message, success: false });
  }
};

const queryValidation = async (req, res, next) => {
  try {
    const schema = joi.object({
      title: joi.string().trim(),
      page: joi.number().integer().min(1),
      limit: joi.number().integer().min(1),
      order_by: joi.string().valid('created_at', 'updated_at', 'amount'),
      order: joi.string().valid('asc', 'desc'),
    });

    await schema.validateAsync(req.query);

    next();
  } catch (error) {
    return res.status(422).json({ message: error.message, success: false });
  }
};

module.exports = { signupValidation, queryValidation };

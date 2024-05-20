const joi = require('joi');
const { validCategories } = require('../database/schemas/expense.schema');

const createExpenseValidation = async (req, res, next) => {
  try {
    const schema = joi.object({
      title: joi.string().trim(),
      description: joi.string().trim(),
      amount: joi.number().required().min(0),
      date: joi.date().required(),
      category: joi
        .string()
        .required()
        .valid(...validCategories),
    });

    await schema.validateAsync(req.body);

    next();
  } catch (error) {
    return res.status(422).json({ success: false, message: error.message });
  }
};

const updateExpenseValidation = async (req, res, next) => {
  try {
    const schema = joi.object({
      title: joi.string().trim(),
      description: joi.string().trim(),
      amount: joi.number().min(0),
      date: joi.date(),
      category: joi.string().valid(...validCategories),
    });

    await schema.validateAsync(req.body);

    next();
  } catch (error) {
    return res.status(422).json({ success: false, message: error.message });
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
      startDate: joi.date(),
      endDate: joi.date(),
    });

    await schema.validateAsync(req.query);

    next();
  } catch (error) {
    return res.status(422).json({ success: false, message: error.message });
  }
};

module.exports = {
  createExpenseValidation,
  updateExpenseValidation,
  queryValidation,
};

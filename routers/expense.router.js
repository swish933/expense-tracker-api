const { Router } = require('express');
const expenseController = require('../controllers/expense.controller');
const {
  queryValidation,
  createExpenseValidation,
  updateExpenseValidation,
} = require('../validation/expense.validation');

const expenseRouter = Router();

expenseRouter.get(
  '/expenses',
  queryValidation,
  expenseController.getAllExpenses
);
expenseRouter.get('/expenses/categories', expenseController.getCategories);
expenseRouter.get('/expenses/:id', expenseController.getExpense);
expenseRouter.get(
  '/expenses',
  queryValidation,
  expenseController.getAllExpenses
);
expenseRouter.post(
  '/expenses',
  createExpenseValidation,
  expenseController.createExpense
);
expenseRouter.patch(
  '/expenses/:id',
  updateExpenseValidation,
  expenseController.updateExpense
);
expenseRouter.delete('/expenses/:id', expenseController.deleteExpense);

module.exports = expenseRouter;

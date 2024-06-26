const { Router } = require('express');
const expenseController = require('../controllers/expense.controller');
const { queryValidation } = require('../validation/expense.validation');

const expenseRouter = Router();

expenseRouter.get(
  '/expenses',
  queryValidation,
  expenseController.getAllExpenses
);
expenseRouter.get('/expenses/categories', expenseController.getCategories);
expenseRouter.get('/expenses/:id', expenseController.getExpense);
expenseRouter.get('/expenses', expenseController.getAllExpenses);
expenseRouter.post('/expenses', expenseController.createExpense);
expenseRouter.patch('/expenses/:id', expenseController.updateExpense);
expenseRouter.delete('/expenses/:id', expenseController.deleteExpense);

module.exports = expenseRouter;

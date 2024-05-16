const expenseService = require('../services/expense.service');

const createExpense = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log('The payload is ', req.body);
    const { titile, username, password } = req.body;

    const newExpense = await expenseService.createExpense(userId, req.body);

    res.json({
      message: 'Expense added succesfully',
      data: newExpense,
    });
  } catch (error) {
    console.error(error);

    res.status(error.status || 500);

    res.json({ error: error.message });
  }
};
const getExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const expense = await expenseService.getExpenseById(id, userId);

    res.json({ message: 'Expense retrieval successful', data: expense });
  } catch (error) {
    console.error(error);

    res.status(error.status || 500);

    res.json({ error: error.message });
  }
};

const getAllExpenses = async (req, res) => {
  try {
    // const values = validate(queryParamSchema, req.query);
    const {
      page = 1,
      limit = 10,
      order = 'asc',
      order_by = 'created_at',
    } = req.query;

    const userId = req.user._id;

    const { expenses, metadata } = await expenseService.getAllExpenses(
      page,
      limit,
      order,
      order_by,
      userId
    );

    const message = metadata.totalPages
      ? 'Expenses retrieval successful'
      : 'No expense found';

    return res.status(200).json({
      success: true,
      message,
      data: expenses,
      metadata,
    });
  } catch (error) {
    console.error(error);

    res.status(error.status || 500);

    res.json({ error: error.message });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const expense = await expenseService.updateExpense(id, userId, payload);

    res.json({ message: 'Expense update successful', data: expense });
  } catch (error) {
    console.error(error);

    res.status(error.status || 500);

    res.json({ error: error.message });
  }
};
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const expense = await expenseService.deleteExpense(id, userId);

    res.status(204).json();
  } catch (error) {
    console.error(error);

    res.status(error.status || 500);

    res.json({ error: error.message });
  }
};
module.exports = {
  getExpense,
  getAllExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
};

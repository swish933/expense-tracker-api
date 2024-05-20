const { validCategories } = require('../database/schemas/expense.schema');
const expenseService = require('../services/expense.service');

const getCategories = async (req, res, next) => {
  try {
    return res.json({
      message: 'Categories retrieval successful',
      data: validCategories,
    });
  } catch (error) {
    next(error);
  }
};

const createExpense = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const newExpense = await expenseService.createExpense(userId, req.body);

    res.status(201).json({
      message: 'Expense added succesfully',
      data: newExpense,
    });
  } catch (error) {
    next(error);
  }
};
const getExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const expense = await expenseService.getExpenseById(id, userId);

    res.json({ message: 'Expense retrieval successful', data: expense });
  } catch (error) {
    next(error);
  }
};

const getAllExpenses = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      order = 'asc',
      order_by = 'created_at',
      startDate,
      endDate,
    } = req.query;

    const userId = req.user.id;

    const { expenses, metadata } = await expenseService.getAllExpenses(
      page,
      limit,
      order,
      order_by,
      userId,
      startDate,
      endDate
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
    next(error);
  }
};

const updateExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const expense = await expenseService.updateExpense(id, userId, payload);

    res.json({ message: 'Expense update successful', data: expense });
  } catch (error) {
    next(error);
  }
};

const deleteExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const expense = await expenseService.deleteExpense(id, userId);

    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getCategories,
  getExpense,
  getAllExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
};

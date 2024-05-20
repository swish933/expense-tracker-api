const { Types } = require('mongoose');
const { Expense } = require('../database/schemas/expense.schema');
const { ErrorWithStatus } = require('../exceptions/error_with_status');

const getExpenseById = async (id, userId) => {
  const expense = await Expense.findOne({ _id: id, user: userId });
  if (!expense) throw new ErrorWithStatus('Expense does not exist', 404);
  return expense;
};

const getAllExpenses = async (
  page,
  limit,
  order,
  order_by,
  userId,
  startDate,
  endDate
) => {
  const query = { user: new Types.ObjectId(userId) };
  const skip = (page - 1) * limit;

  if (startDate || endDate) {
    query.date = {};
    if (startDate) {
      query.date.$gte = new Date(startDate);
    }
    if (endDate) {
      query.date.$gte = new Date(endDate);
    }
  }
  // console.log(query);

  const expenses = await Expense.find(query)
    .skip(skip)
    .limit(limit)
    .sort([[order_by, order]]);
  const totalCount = await Expense.countDocuments(query);

  // Calculate the total expenses for the matched query
  const totalExpenseAmount = await Expense.aggregate([
    { $match: query },
    { $group: { _id: null, totalAmount: { $sum: '$amount' } } },
  ]);

  const totalExpense =
    totalExpenseAmount.length > 0 ? totalExpenseAmount[0].totalAmount : 0;

  const totalPages = Math.ceil(totalCount / limit);
  const metadata = {
    page,
    limit,
    totalAmount: totalExpense,
    totalPages,
    totalCount,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
  };
  return { expenses, metadata };
};

const createExpense = async (userId, payload) => {
  try {
    const expense = await new Expense({
      ...payload,
      user: userId,
    }).populate('user');
    await expense.save();
    return expense;
  } catch (err) {
    // if (err.code === 11000) {
    //   throw new Conflict('Expense with same title already exists');
    // }
    throw new ErrorWithStatus(err.message || 'Something went wrong', 500);
  }
};

const updateExpense = async (expenseId, userId, payload) => {
  const expenseExists = await Expense.findById(expenseId);
  if (!expenseExists) throw new ErrorWithStatus('Expense not found', 404);

  const expense = await Expense.findOneAndUpdate(
    { _id: expenseId, user: userId },
    { $set: payload },
    { new: true }
  );

  if (!expense)
    throw new ErrorWithStatus('Not authorized to update this expense', 403);
  return expense;
};

const deleteExpense = async (expenseId, userId) => {
  const expenseExists = await Expense.findById(expenseId);
  if (!expenseExists) throw new ErrorWithStatus('Expense not found', 404);

  const expense = await Expense.findOneAndDelete({
    _id: expenseId,
    user: userId,
  });
  if (!expense)
    throw new ErrorWithStatus('Not authorized to delete expense', 403);

  return expense;
};

module.exports = {
  getExpenseById,
  getAllExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
};

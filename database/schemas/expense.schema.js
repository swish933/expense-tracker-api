const { Schema, Types, model } = require('mongoose');

const validCategories = [
  'groceries',
  'leisure',
  'electronics',
  'utilities',
  'clothing',
  'health',
  'others',
];

const expenseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    category: {
      type: String,
      required: true,
      enum: validCategories,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
      },
    },
  }
);

module.exports = { Expense: model('Expense', expenseSchema), validCategories };

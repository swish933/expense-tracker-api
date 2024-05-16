const { Schema, model } = require('mongoose');

const expenseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    category: {
      type: String,
      required: true,
      enum: [
        'groceries',
        'leisure',
        'electronics',
        'utilities',
        'clothing',
        'health',
        'others',
      ],
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

module.exports = model('Expense', expenseSchema);

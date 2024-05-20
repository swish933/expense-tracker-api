const express = require('express');
const { connectToMongoDB } = require('./database/connection');
const authRouter = require('./routers/auth.router.js');
const expenseRouter = require('./routers/expense.router.js');
const isAuthenticated = require('./middlewares/auth.middleware');
const morgan = require('morgan');

require('dotenv').config();

const app = express();
const { PORT } = process.env;

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use(isAuthenticated);
app.use('/api', expenseRouter);

app.use((err, req, res, next) => {
  // console.error(err);
  res.status(err.status || 500);
  res.json({ success: false, error: err.message });
});

connectToMongoDB();
app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));

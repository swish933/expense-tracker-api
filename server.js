const express = require("express");
const { connectToMongoDB } = require("./database/connection");
const authRouter = require("./routers/auth.router");

require("dotenv").config();

const app = express();
const { PORT } = process.env;

app.use(express.json());

connectToMongoDB();

app.use("/auth", authRouter);

app.use((error, req, res, next) => {
	console.error(error);
	res.status(error.status || 500);
	res.json({ error: error.message });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));

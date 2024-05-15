const express = require("express");
const { connectToMongoDB } = require("./database/connection");
const authRouter = require("./routers/auth.router.js");

require("dotenv").config();

const app = express();
const { PORT } = process.env;

app.use(express.json());

connectToMongoDB();

app.use((err, req, res, next) => {
	console.error(err);
	res.status(err.status || 500);
	res.json({ error: err.message });
});

app.use("/auth", authRouter);
app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));

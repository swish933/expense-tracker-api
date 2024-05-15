const express = require("express");
const { connectToMongoDB } = require("./database/connection");

require("dotenv").config();

const app = express();
const { PORT } = process.env;

connectToMongoDB();

app.use((err, req, res, next) => {
	console.log(err);
	res.status(err.status || 500);
	res.json({ error: err.message });
});

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));

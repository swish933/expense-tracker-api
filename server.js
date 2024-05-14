const express = require("express");
const { connectToMongoDB } = require("./database/connection");

require("dotenv").config();

const app = express();
const { PORT } = process.env;

connectToMongoDB();

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

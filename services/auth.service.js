const User = require("../database/schemas/user.schema");
const bcrypt = require("bcrypt");
const { ErrorWithStatus } = require("../exceptions/error_with_status");

const signup = async (email, username, password) => {
	const existingUser = await User.findOne({ email });

	if (existingUser) {
		throw new ErrorWithStatus("User already exists. Try to login", 400);
	}

	const saltRounds = 10;

	password = await bcrypt.hash(password, saltRounds);

	const newUser = new User({ email, username, password });

	await newUser.save();

	return newUser;
};

module.exports = { signup };

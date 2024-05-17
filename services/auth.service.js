const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../database/schemas/user.schema");
const { ErrorWithStatus } = require("../exceptions/error_with_status");

const signup = async (email, username, password) => {
	try {
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			throw new ErrorWithStatus("User already exists. Try to login", 400);
		}

		const saltRounds = 10;

		password = await bcrypt.hash(password, saltRounds);

		const newUser = new User({ email, username, password });

		await newUser.save();

		return newUser;
	} catch (error) {
		throw new ErrorWithStatus(error.message, 500);
	}
};

const login = async (userInfo, password) => {
	try {
		const user = await User.findOne({
			$or: [{ email: userInfo }, { username: userInfo }],
		});

		if (!user) {
			throw new ErrorWithStatus("User not found. Please sign up", 404);
		}

		const isValidPassword = await bcrypt.compare(password, user.password);

		if (!isValidPassword) {
			throw new ErrorWithStatus("Username/Email or Password is incorrect", 401);
		}

		const JWT_SECRET = process.env.JWT_SECRET;

		const token = jwt.sign(
			{
				id: user._id,
				sub: user._id,
				email: user.email,
			},
			JWT_SECRET,
			{ expiresIn: "1h" }
		);

		return { accessToken: token, user };
	} catch (error) {
		throw new ErrorWithStatus(error.message, 500);
	}
};

module.exports = { signup, login };

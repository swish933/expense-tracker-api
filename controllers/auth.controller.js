const authService = require("../services/auth.service");

const signup = async (req, res, next) => {
	try {
		const { email, username, password } = req.body;

		const newUser = await authService.signup(email, username, password);

		res.json({
			message: "User registered succesfully",
			data: newUser,
		});
	} catch (error) {
		next(error);
	}
};

const login = async (req, res, next) => {
	try {
		const { email, username, password } = req.body;
		const userInfo = !email ? username : email;

		const { accessToken, user } = await authService.login(userInfo, password);

		res.json({ message: "login successful", data: { accessToken, user } });
	} catch (error) {
		next(error);
	}
};

module.exports = { signup, login };

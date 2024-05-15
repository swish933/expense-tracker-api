const authService = require("../services/auth.service");

const signup = async (req, res) => {
	try {
		const { email, username, password } = req.body;

		const newUser = await authService.signup(email, username, password);

		res.json({
			message: "User registered succesfully",
			data: newUser,
		});
	} catch (error) {
		console.error(error);

		res.status(error.status || 500);

		res.json({ error: error.message });
	}
};

module.exports = { signup };

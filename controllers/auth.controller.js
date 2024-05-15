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

const login = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const userInfo = !email ? username : email;

        const { accessToken, user } = await authService.login(userInfo, password);
        
        res.json({message: "login successful", data: {accessToken, user}})
        
    } catch (error) {
        console.error(error);

		res.status(error.status || 500);

		res.json({ error: error.message });
    }
}

module.exports = { signup, login };

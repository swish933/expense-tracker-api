const userService = require("../services/user.service");

const getUser = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const user = await userService.getUser(userId);
		res.json({ user });
	} catch (error) {
		next(error);
	}
};

module.exports = { getUser };

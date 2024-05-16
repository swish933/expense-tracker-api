const userService = require("../services/user.service");

const getUser = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const user = await userService.getUser(userId);
		res.json({ data: user });
	} catch (error) {
		next(error);
	}
};

const updateUser = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const { ...userData } = req.body;

		const updatedUserDetails = await userService.updateUser(userId, userData);
		res.json({ message: "User details updated", data: updatedUserDetails });
	} catch (error) {
		next(error);
	}
};

module.exports = { getUser, updateUser };

const User = require("../database/schemas/user.schema");
const { ErrorWithStatus } = require("../exceptions/error_with_status");

const getUser = async (userId) => {
	try {
		const user = await User.findById(userId);

		if (!user) {
			throw new ErrorWithStatus("User not found", 404);
		}

		return user;
	} catch (error) {
		throw new ErrorWithStatus(error.message, 500);
	}
};

const updateUser = async (userId, dto) => {
	try {
		const updatedUserInfo = await User.findByIdAndUpdate(
			userId,
			{ ...dto },
			{ new: true }
		);

		return updatedUserInfo;
	} catch (error) {
		throw new ErrorWithStatus(error.message, 500);
	}
};

module.exports = { getUser, updateUser };

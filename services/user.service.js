const User = require("../database/schemas/user.schema");
const { ErrorWithStatus } = require("../exceptions/error_with_status");

const getUser = async (userId) => {
	const user = await User.findById(userId);

	if (!user) {
		throw new ErrorWithStatus("User not found", 404);
	}

	return user;
};

const updateUser = async (userId, dto) => {
	const updatedUserInfo = await User.findByIdAndUpdate(
		userId,
		{ ...dto },
		{ new: true }
	);

	return updatedUserInfo;
};

module.exports = { getUser, updateUser };

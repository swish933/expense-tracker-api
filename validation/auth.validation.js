const joi = require("joi");

const signupValidation = async (req, res, next) => {
	try {
		const schema = joi.object({
			email: joi.string().email().required(),
			username: joi.string(),
			password: joi.string().min(6).required(),
			confirmPassword: joi
				.any()
				.valid(joi.ref("password"))
				.required()
				.error(new Error("Passwords do not match")),
		});

		await schema.validateAsync(req.body);

		next();
	} catch (error) {
		return res.status(422).json({ message: error.message, success: false });
	}
};

const loginValidation = async (req, res, next) => {
	try {
		const schema = joi
			.object({
				email: joi.string().email(),
				username: joi.string(),
				password: joi.string().min(6).required(),
			})
			.xor("email", "username");

		await schema.validateAsync(req.body);

		next();
	} catch (error) {
		return res.status(422).json({ message: error.message, success: false });
	}
};

module.exports = { signupValidation, loginValidation };

const joi = require("joi");

const userInfoValidation = async (req, res, next) => {
	try {
		const schema = joi.object({
			username: joi.string(),
			email: joi.string().email(),
		});

		await schema.validateAsync(req.body);
		next();
	} catch (error) {
		return res.status(422).json({ error: error.message, success: false });
	}
};

module.exports = { userInfoValidation };

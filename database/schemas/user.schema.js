const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	username: {
		type: String,
		index: {
			unique: true,
			sparse: true,
		},
		trim: true,
	},
	password: {
		type: String,
		required: true,
		trim: true,
	},
});

UserSchema.set("toJSON", {
	// virtuals: true,
	versionKey: false,
	transform: function (doc, ret) {
		delete ret["password"];
		return ret;
	},
});

const User = model("User", UserSchema);

module.exports = User;

const { required } = require("joi");
const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	username: {
		type: String,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
});

UserSchema.set("toJSON", {
	virtuals: true,
	versionKey: false,
	transform: function (doc, ret) {
		delete ret["password"];
		return ret;
	},
});

const User = model("User", UserSchema);

module.exports = User;

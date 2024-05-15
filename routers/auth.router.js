const { Router } = require("express");
const authController = require("../controllers/auth.controller.js");
const { signupValidation } = require("../validation/auth.validation.js");

const authRouter = Router();

authRouter.post("/signup", signupValidation, authController.signup);

module.exports = authRouter;

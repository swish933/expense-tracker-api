const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const { signupValidation, loginValidation } = require("../validation/auth.validation");

const authRouter = Router();

authRouter.post("/signup", signupValidation, authController.signup);
authRouter.post("/login", loginValidation, authController.login);

module.exports = authRouter;

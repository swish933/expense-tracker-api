const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const { signupValidation } = require("../validation/auth.validation");

const authRouter = Router();

authRouter.post("/signup", signupValidation, authController.signup);

module.exports = authRouter;

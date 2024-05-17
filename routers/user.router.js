const { Router } = require("express");
const userController = require("../controllers/user.controller");
const checkAuth = require("../middlewares/auth.middleware");
const { userInfoValidation } = require("../validation/user.validation.js");

const userRouter = Router();

userRouter.use(checkAuth);

userRouter.get("/", userController.getUser);

userRouter.patch("/", userInfoValidation, userController.updateUser);

module.exports = userRouter;

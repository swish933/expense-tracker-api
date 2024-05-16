const { Router } = require("express");
const userController = require("../controllers/user.controller");
const checkAuth = require("../middlewares/auth.middleware");

const userRouter = Router();

userRouter.use(checkAuth);

userRouter.get("/", userController.getUser);

module.exports = userRouter;

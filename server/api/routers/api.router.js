const express = require("express");
const taskRouter = require("./task.router");
const userRouter = require("./user.router");

const apiRouter = express.Router();

apiRouter.use("/", taskRouter);
apiRouter.use("/", userRouter);

module.exports = apiRouter;

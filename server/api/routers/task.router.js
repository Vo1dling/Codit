const express = require("express");
const {
  getAllTasks,
  postTask,
  editTask,
  deleteTask,
  editStatus,
} = require("../controllers/task.controllers");
const authorize = require("../../middleware/authorize");
const authenticate = require("../../middleware/authenticate");

const taskRouter = express.Router();

taskRouter.get("/tasks", [authenticate, authorize], getAllTasks);
taskRouter.post("/tasks", [authenticate, authorize], postTask);
taskRouter.put("/tasks/:id", [authenticate, authorize], editTask);
taskRouter.put("/tasks/status/:id", [authenticate], editStatus);
taskRouter.delete("/tasks/:id", [authenticate, authorize], deleteTask);

module.exports = taskRouter;

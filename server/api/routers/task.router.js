const express = require("express");
const {
  getAllTasks,
  getTask,
  postTask,
  editTask,
  deleteTask,
} = require("../controllers/task.controllers");
const authorize = require("../../middleware/authorize");
const authenticate = require("../../middleware/authenticate");

const taskRouter = express.Router();

taskRouter.get("/tasks", getAllTasks);
taskRouter.get("/tasks/:id", getTask);
taskRouter.post("/tasks", authenticate, authorize, postTask);
taskRouter.put("/tasks/:id", authenticate, authorize, editTask);
taskRouter.delete("/tasks/:id", authenticate, authorize, deleteTask);

module.exports = taskRouter;

const express = require("express");
const Task = require("../../models/task");
const User = require("../../models/user");
const { createCustomError } = require("./utils/error.utils");
const { addTask } = require("./utils/utils");

const app = express();
app.use(express.json());

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({})
      .populate("taskCreator")
      .populate({ path: "assignedEmployees.employee" });
    if (tasks.length < 1) {
      throw Error({
        type: "getAllTasks Error",
        statusCode: 404,
        message: "No Tasks found",
      });
    }
    res.status(200).send(tasks);
  } catch (e) {
    res.send(e);
  }
};

const postTask = async (req, res) => {
  try {
    const task = await addTask({ ...req.body, taskCreator: req.user._id });
    const addedUsers = await Promise.all(
      req.body.assignedEmployees.map((employee) =>
        User.findById(employee.employee._id)
      )
    );
    await Promise.all(
      addedUsers.map((user) => {
        if (!user.tasks.includes(newTask._id)) user.tasks.push(newTask._id);
        user.save();
      })
    );
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    if (e.message.includes("validation"))
      return res.send({ type: "Schema Validation Error", error: e });
    res.send(e.message);
  }
};

const editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const oldTask = await Task.findById(id);
    if (!oldTask)
      throw createCustomError("Task not found", 404, "editTask Error");
    const newTask = req.body;
    const removedEmployees = oldTask.assignedEmployees.filter(
      (employee) =>
        !newTask.assignedEmployees.find(
          (newEmployee) => newEmployee.employee._id == employee.employee
        )
    );
    const removedUsers = await Promise.all(
      removedEmployees.map((employee) => User.findById(employee.employee))
    );
    await Promise.all(
      removedUsers.map((user) => {
        user.tasks = user.tasks.filter((task) => !task.equals(newTask._id));
        user.save();
      })
    );
    const addedEmployees = newTask.assignedEmployees.filter(
      (employee) =>
        !oldTask.assignedEmployees.find(
          (oldEmployee) => oldEmployee.employee == employee.employee._id
        )
    );
    const addedUsers = await Promise.all(
      addedEmployees.map((employee) => User.findById(employee.employee._id))
    );
    await Promise.all(
      addedUsers.map((user) => {
        if (!user.tasks.includes(newTask._id)) user.tasks.push(newTask._id);
        user.save();
      })
    );
    for (const prop in newTask) {
      oldTask[prop] = newTask[prop];
    }

    await oldTask.save();
    res.send(oldTask);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const editStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (status !== "Handling" && status !== "Ready")
      return res.status(400).send("Bad Status");
    const user = req.user;
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send("Task not Found!");
    const employee = task.assignedEmployees.find((employee) =>
      employee.employee.equals(user._id)
    );
    if (!employee) return res.status(404).send("User not Found!");
    employee.employeeStatus = status;
    if (status === "Handling") {
      if (!task.startedAt) task.startedAt = new Date();
      if (!employee.startedAt) employee.startedAt = new Date();
      task.status = status;
    } else if (status === "Ready") {
      if (
        task.assignedEmployees.find(
          (employee) =>
            employee.employeeStatus === "Handling" ||
            employee.employeeStatus === "Awaiting Response"
        ) === undefined
      ) {
        task.status = "Ready";
        task.finishedAt = new Date();
      }
      employee.finishedAt = new Date();
    }

    await task.save();
    res.send(`Updated Status to : ${status}`);
  } catch (e) {
    res.status(500).send(e.message);
  }
};
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id).populate({
      path: "assignedEmployees.employee",
      select: "name tasks _id",
    });
    const users = await Promise.all(
      task.assignedEmployees.map((employee) =>
        User.findById(employee.employee._id)
      )
    );
    await Promise.all(
      users.map((user) => {
        user.tasks = user.tasks.filter(
          (tempTask) => !tempTask.equals(task._id)
        );
        user.save();
      })
    );
    await Task.findByIdAndDelete(id);
    res.send("Task Deleted");
  } catch (e) {
    res.status(500).send(e.message);
  }
};
module.exports = {
  editTask,
  getAllTasks,
  postTask,
  deleteTask,
  editStatus,
};

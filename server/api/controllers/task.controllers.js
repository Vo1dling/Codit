const express = require("express");
const { send } = require("express/lib/response");
const Task = require("../../models/task");
const { createCustomError } = require("./utils/error.utils");
const { getData, addTask } = require("./utils/utils");

const app = express();
app.use(express.json());

const getAllTasks = async (req, res) => {
  try {
    const tasks = await getData();

    if (!tasks.length) {
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
    const task = await addTask(req.body);

    await task.save();
    res.status(201).send(task);
  } catch (e) {
    if (e.message.includes("validation"))
      return res.send({ type: "Scheam Validation Error", error: e });
    res.send(e.message);
  }
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await getData(id);
    if (!task) {
      throw createCustomError("Task Not Found", 404, "getTask Error");
    }

    res.send(task);
  } catch (e) {
    res.send({ error: e });
  }
};

const editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) throw createCustomError("Task not found", 404, "editTask Error");
    const newTask = req.body;
    for (const prop in newTask) {
      task[prop] = newTask[prop];
    }
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(500).send(e.message);
  }
};
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
  } catch (e) {
    res.status(500).send(e.message);
  }
};
module.exports = { editTask, getAllTasks, postTask, getTask, deleteTask };

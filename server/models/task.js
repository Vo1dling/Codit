const mongoose = require("mongoose");

const Task = mongoose.model("Task", {
  Task: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
  },
  AssignedEmployees: {
    type: Array,
  },
  TaskCreator: {
    type: String,
  },
});
module.exports = Task;

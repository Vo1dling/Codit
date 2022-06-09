const mongoose = require("mongoose");

const Task = mongoose.model("Task", {
	task: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		default: "Inactive",
	},
	assignedEmployees: [
		{
			employee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
			employeeStatus: { type: String, default: "Awaiting Response" },
			startedAt: { type: Date },
			finishedAt: { type: Date },
		},
	],

	taskCreator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	startedAt: { type: Date },
	finishedAt: { type: Date },
});
module.exports = Task;

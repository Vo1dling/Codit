const Task = require("../../../models/task");
const path = require("path");
const getReact = () => {
	return path.resolve(__dirname, "../../../../client/build");
};

const getData = async (id) => {
	let tasks = [];
	if (id) tasks = await Task.findById(id);
	else tasks = await Task.find({});

	return tasks;
};

const addTask = async (information) => {
	const createdTask = new Task(information);
	return createdTask;
};

module.exports = {
	getData,
	addTask,
	getReact,
};

import "./TaskPage.styles.css";
import Table from "../../components/Table/Table.components";
import { useEffect, useState } from "react";
import PopupWindow from "../../components/PopupWindow/PopupWindow.components";
import CustomInput from "../../components/CustomInput/CustomInput.components";
import CustomButton from "../../components/CustomButton/CustomButton.components";
import moment from "moment";
import api from "../../components/api/api";
const CreatePage = ({ taskData, currentUser, getData, userData }) => {
  const [filteredData, setData] = useState([]);
  const [isEdit, setEdit] = useState(false);
  const [showDelete, setDelete] = useState(false);
  const [selectedTask, setTask] = useState({});
  const [sortingType, setSort] = useState({
    type: "off",
    isAsc: true,
  });
  const [searchValue, setSearch] = useState("");
  const { task, assignedEmployees } = selectedTask;
  const onInputChange = (e) => {
    setTask({
      ...selectedTask,
      [e.target.getAttribute("data-prop")]: e.target.value || e.target.checked,
    });
  };
  const editTask = async () => {
    try {
      if (selectedTask._id)
        await api.put(`/Task/${selectedTask._id}`, selectedTask);
      else await api.post("/tasks", selectedTask);
      getData();
      setEdit(false);
    } catch (e) {
      console.error(e);
    }
  };
  const deleteTask = async () => {
    try {
      await api.delete(`/tasks/${selectedTask._id}`);
      getData();
      setDelete(false);
    } catch (e) {
      console.error(e);
    }
  };
  const compare = (a, b) => {
    if (sortingType.type === "Task") {
      if (a.task < b.task) return -1;
      if (a.task > b.task) return 1;
    } else if (sortingType.type === "Status") {
      if (a.status < b.status) return -1;
      if (a.status > b.status) return 1;
    }
    return 0;
  };
  const sortData = () => {
    const arrayCopy = [...taskData];
    if (sortingType.type === "Task" || sortingType.type === "Role")
      sortingType.isAsc
        ? arrayCopy.sort(compare)
        : arrayCopy.sort(compare).reverse();
    else if (sortingType.type === "ID Number")
      sortingType.isAsc
        ? arrayCopy.sort((a, b) => a.idNumber - b.idNumber)
        : arrayCopy.sort((a, b) => a.idNumber - b.idNumber).reverse();
    setData(arrayCopy);
  };
  useEffect(() => {
    sortData();
  }, [taskData, sortingType]);
  useEffect(() => {
    if (searchValue !== "")
      setData(
        filteredData.filter((user) =>
          user.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    else {
      setData(taskData);
      sortData();
    }
  }, [searchValue]);
  const search = (e) => {
    setSearch(e.target.value);
  };
  const header = [
    { label: "Task", prop: "task", isSortable: true },
    { label: "Status", prop: "status", isSortable: false },
    {
      label: "Assigned Employees",
      prop: "assignedEmployees",
      isSortable: false,
    },
    { label: "Owner", prop: "taskCreator", isSortable: false },
    { label: "Started At", prop: "startedAt", isSortable: false },
    { label: "Finished At", prop: "finishedAt", isSortable: false },
  ];

  return (
    <div className="userTable-page">
      <Table
        data={filteredData}
        sortingType={sortingType}
        setSort={setSort}
        currentUser={currentUser}
        setEdit={setEdit}
        setUser={setTask}
        setDelete={setDelete}
        search={search}
        searchValue={searchValue}
        header={header}
      />
      {isEdit && (
        <PopupWindow
          title={selectedTask._id ? "Edit Task" : "Add Task"}
          titleSize="h4"
        >
          <div className="inputs-container">
            <CustomInput
              label="Task"
              placeHolder="Enter Task..."
              required
              value={task}
              onChange={onInputChange}
              prop="task"
            />
            <label for="assignedEmployees">Choose a User:</label>
            <select name="assign" id="assign">
              {userData.map((user) => (
                <option value={user.name}>{user.name}</option>
              ))}
            </select>
            <CustomInput
              label="Assigned Employees"
              placeHolder="Assign an Employee('s)..."
              type="select"
              value={assignedEmployees}
              onChange={onInputChange}
              prop="assignedEmployees"
            ></CustomInput>
          </div>
          <div className="btn-container">
            <CustomButton
              text="Cancel"
              onClick={() => {
                setEdit(false);
                setTask({});
              }}
            />
            <CustomButton text="Save" onClick={editTask} />
          </div>
        </PopupWindow>
      )}
      {showDelete && (
        <PopupWindow
          title={`Are you sure you want to delete ${selectedTask.Task}`}
          titleSize="h5"
        >
          <div className="btn-container">
            <CustomButton
              text="No"
              onClick={() => {
                setDelete(false);
              }}
            />
            <CustomButton text="Yes" onClick={deleteTask} />
          </div>
        </PopupWindow>
      )}
    </div>
  );
};
export default CreatePage;

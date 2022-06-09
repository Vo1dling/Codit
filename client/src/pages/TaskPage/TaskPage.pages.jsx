import "./TaskPage.styles.css";
import Table from "../../components/Table/Table.components";
import { useEffect, useState } from "react";
import PopupWindow from "../../components/PopupWindow/PopupWindow.components";
import CustomInput from "../../components/CustomInput/CustomInput.components";
import CustomButton from "../../components/CustomButton/CustomButton.components";

import api from "../../components/api/api";
const TaskTable = ({ taskData, currentUser, getData, userData }) => {
  const [filteredTableData, setTableData] = useState([]);
  const [isEdit, setEdit] = useState(false);
  const [showInfo, setInfo] = useState(false);
  const [showDelete, setDelete] = useState(false);
  const [selectedTask, setTask] = useState({});
  const [sortingType, setSort] = useState({
    type: "off",
    isAsc: true,
  });
  const [searchValue, setSearch] = useState("");
  const [assignResults, setResults] = useState([]);
  const [assignValue, setAssign] = useState("");
  const { task } = selectedTask;
  const onInputChange = (e) => {
    setTask({
      ...selectedTask,
      [e.target.getAttribute("data-prop")]: e.target.value || e.target.checked,
    });
  };
  const editTask = async () => {
    try {
      if (selectedTask._id)
        await api.put(`/tasks/${selectedTask._id}`, selectedTask);
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
    setTableData(arrayCopy);
  };
  useEffect(() => {
    // eslint-disable-next-line
    sortData();
  }, [taskData, sortingType]);
  useEffect(() => {
    if (searchValue !== "")
      setTableData(
        filteredTableData.filter((task) =>
          task.task.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    else {
      setTableData(taskData);
      sortData();
    }
  }, [searchValue]);
  const search = (e) => {
    setSearch(e.target.value);
  };
  const assign = (e) => {
    setAssign(e.target.value);
  };
  useEffect(() => {
    if (selectedTask.hasOwnProperty("assignedEmployees")) {
      const idList = selectedTask.assignedEmployees.map(
        (employee) => employee.employee._id
      );
      setResults(
        userData
          .filter((user) =>
            user.name.toLowerCase().includes(assignValue.toLowerCase())
          )
          .filter((user) => !idList.includes(user._id))
      );
    }
  }, [assignValue]);
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
  const assignEmployee = (employee) => {
    setTask({
      ...selectedTask,
      assignedEmployees: [
        ...selectedTask.assignedEmployees,
        { employee, employeeStatus: "Awaiting Response" },
      ],
    });
    setAssign("");
  };
  const unassignEmployee = (employee) => {
    setTask({
      ...selectedTask,
      assignedEmployees: selectedTask.assignedEmployees.filter(
        (tempEmployee) => tempEmployee.employee._id !== employee.employee._id
      ),
    });
    setAssign("");
  };
  return (
    <div className="userTable-page">
      <Table
        data={filteredTableData}
        sortingType={sortingType}
        setSort={setSort}
        currentUser={currentUser}
        setEdit={setInfo}
        setUser={setTask}
        setDelete={setDelete}
        search={search}
        searchValue={searchValue}
        header={header}
        title={"Registered Tasks"}
        buttonText={"Add Task"}
      />

      {showDelete && (
        <PopupWindow
          title={`Are you sure you want to delete ${selectedTask.task}`}
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
      {showInfo &&
        selectedTask.hasOwnProperty("assignedEmployees") &&
        selectedTask._id && (
          <PopupWindow title="View Task" titleSize="h5">
            <h3>Task:{selectedTask.task}</h3>
            <div className="results-container">
              <CustomInput
                placeHolder="Enter Employee name..."
                label="Add Employee"
                value={assignValue}
                onChange={assign}
              />
              {assignValue !== "" && (
                <div className="results-view">
                  {assignResults.map((result) => (
                    <CustomButton
                      text={result.name}
                      onClick={() => {
                        assignEmployee(result);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="employee-container">
              {selectedTask.assignedEmployees.map((employee) => (
                <div className="employee-card">
                  <p>{employee.employee.name}</p>
                  <p>{employee.employeeStatus}</p>
                  <p>{employee.startedAt}</p>
                  <p>{employee.finishedAt}</p>
                  <CustomButton
                    text="Remove"
                    onClick={() => {
                      unassignEmployee(employee);
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="btn-container">
              <CustomButton
                text="Cancel"
                onClick={() => {
                  setInfo(false);
                  setTask({});
                }}
              />
              <CustomButton text="Save" onClick={editTask} />
            </div>
          </PopupWindow>
        )}
    </div>
  );
};
export default TaskTable;

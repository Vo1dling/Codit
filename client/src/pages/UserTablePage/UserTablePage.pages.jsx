import "./UserTablePage.styles.css";
import Table from "../../components/Table/Table.components";
import { useEffect, useState } from "react";
import PopupWindow from "../../components/PopupWindow/PopupWindow.components";
import CustomInput from "../../components/CustomInput/CustomInput.components";
import CustomButton from "../../components/CustomButton/CustomButton.components";
import moment from "moment";
import api from "../../components/api/api";
const CreatePage = ({ data, currentUser, getData }) => {
  const [filteredData, setData] = useState([]);
  const [isEdit, setEdit] = useState(false);
  const [showDelete, setDelete] = useState(false);
  const [selectedUser, setUser] = useState({});
  const [sortingType, setSort] = useState({
    type: "off",
    isAsc: true,
  });
  const [searchValue, setSearch] = useState("");
  const { name, email, password, dateOfBirth, idNumber, isManager } =
    selectedUser;
  const onInputChange = (e) => {
    setUser({
      ...selectedUser,
      [e.target.getAttribute("data-prop")]: e.target.value || e.target.checked,
    });
  };
  const editUser = async () => {
    try {
      if (selectedUser._id)
        await api.put(`/users/${selectedUser._id}`, selectedUser);
      else await api.post("/users", selectedUser);
      getData();
      setEdit(false);
    } catch (e) {
      console.error(e);
    }
  };
  const deleteUser = async () => {
    try {
      await api.delete(`/users/${selectedUser._id}`);
      getData();
      setDelete(false);
    } catch (e) {
      console.error(e);
    }
  };
  const compare = (a, b) => {
    if (sortingType.type === "Name") {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
    } else if (sortingType.type === "Role") {
      if (a.isManager) return -1;
      if (b.isManager) return 1;
    }
    return 0;
  };
  const sortData = () => {
    const arrayCopy = [...data];
    if (sortingType.type === "Name" || sortingType.type === "Role")
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
  }, [data, sortingType]);
  useEffect(() => {
    if (searchValue !== "")
      setData(
        filteredData.filter((user) =>
          user.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    else {
      setData(data);
      sortData();
    }
  }, [searchValue]);
  const search = (e) => {
    setSearch(e.target.value);
  };
  const header = [
    { label: "Name", prop: "name", isSortable: true },
    { label: "Email", prop: "email", isSortable: false },
    { label: "Date of Birth", prop: "dateOfBirth", isSortable: false },
    { label: "ID Number", prop: "idNumber", isSortable: true },
    { label: "Role", prop: "isManager", isSortable: true },
  ];

  return (
    <div className="userTable-page">
      <Table
        data={filteredData}
        sortingType={sortingType}
        setSort={setSort}
        currentUser={currentUser}
        setEdit={setEdit}
        setUser={setUser}
        setDelete={setDelete}
        search={search}
        searchValue={searchValue}
        header={header}
      />
      {isEdit && (
        <PopupWindow
          title={selectedUser._id ? "Edit User" : "Add User"}
          titleSize="h4"
        >
          <div className="inputs-container">
            <CustomInput
              label="Name"
              placeHolder="Enter Name..."
              required
              value={name}
              onChange={onInputChange}
              prop="name"
            />
            <CustomInput
              label="Email"
              placeHolder="Enter Email..."
              type="email"
              required
              value={email}
              onChange={onInputChange}
              prop="email"
            />
            <CustomInput
              label="Password"
              placeHolder="Enter Password..."
              type="password"
              value={password}
              onChange={onInputChange}
              prop="password"
            />
            <CustomInput
              label="Date of Birth"
              type="date"
              required
              value={moment(dateOfBirth || "").format("yyyy-MM-DD")}
              onChange={onInputChange}
              prop="dateOfBirth"
            />

            <CustomInput
              label="ID Number"
              placeHolder="Enter ID Number..."
              type="number"
              required
              value={idNumber}
              onChange={onInputChange}
              prop="idNumber"
            />
            <CustomInput
              label="Manager Rights"
              type="checkbox"
              checked={isManager}
              prop="isManager"
              onChange={onInputChange}
            />
          </div>
          <div className="btn-container">
            <CustomButton
              text="Cancel"
              onClick={() => {
                setEdit(false);
                setUser({});
              }}
            />
            <CustomButton text="Save" onClick={editUser} />
          </div>
        </PopupWindow>
      )}
      {showDelete && (
        <PopupWindow
          title={`Are you sure you want to delete the User ${selectedUser.name}`}
          titleSize="h5"
        >
          <div className="btn-container">
            <CustomButton
              text="No"
              onClick={() => {
                setDelete(false);
              }}
            />
            <CustomButton text="Yes" onClick={deleteUser} />
          </div>
        </PopupWindow>
      )}
    </div>
  );
};
export default CreatePage;

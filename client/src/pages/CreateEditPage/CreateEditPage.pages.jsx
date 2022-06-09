import "./CreateEditPage.styles.css";
import Table from "../../components/Table/Table.components";
import { useState } from "react";
import PopupWindow from "../../components/PopupWindow/PopupWindow.components";
import CustomInput from "../../components/CustomInput/CustomInput.components";
import CustomButton from "../../components/CustomButton/CustomButton.components";
import moment from "moment";
import api from "../../components/api/api";
const CreatePage = ({ data, currentUser, getData }) => {
  const [isEdit, setEdit] = useState(false);
  const [showDelete, setDelete] = useState(false);
  const [selectedUser, setUser] = useState({});
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
      await api.put(`/users/${selectedUser._id}`, selectedUser);
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
  return (
    <div className="create-page">
      {isEdit && (
        <PopupWindow title="Edit User" titleSize="h4">
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
              value={moment(dateOfBirth).format("yyyy-MM-DD")}
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
      <Table
        data={data}
        currentUser={currentUser}
        setEdit={setEdit}
        setUser={setUser}
        setDelete={setDelete}
      />
    </div>
  );
};

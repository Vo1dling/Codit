import "./CreateEditPage.styles.css";
import Table from "../../components/Table/Table.components";
import { useState } from "react";
import EditWindow from "../../components/EditWindow/EditWindow.components";
import CustomInput from "../../components/CustomInput/CustomInput.components";
const CreatePage = ({ data, currentUser }) => {
  const [isEdit, setEdit] = useState(true);
  const [selectedUser, setUser] = useState({});

  return (
    <div className="create-page">
      {isEdit && (
        <EditWindow title="Edit User">
          <div className="inputs-container">
            <CustomInput label="Name" placeHolder="Enter Name..." required />
            <CustomInput
              label="Email"
              placeHolder="Enter Email..."
              type="email"
              required
            />
            <CustomInput
              label="Password"
              placeHolder="Enter Password..."
              type="password"
              required
            />
            <CustomInput label="Date of Birth" type="date" required />
            <CustomInput
              label="ID Number"
              placeHolder="Enter ID Number..."
              type="number"
              required
            />
            <CustomInput label="Manager Rights" type="checkbox" />
          </div>
        </EditWindow>
      )}
      <Table
        data={data}
        currentUser={currentUser}
        setEdit={setEdit}
        setUser={setUser}
      />
    </div>
  );
};
export default CreatePage;

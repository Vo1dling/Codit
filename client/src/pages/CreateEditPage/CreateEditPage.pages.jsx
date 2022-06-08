import "./CreateEditPage.styles.css";
import Table from "../../components/Table/Table.components";
const CreatePage = ({ data, currentUser }) => {
  return (
    <div className="create-page">
      <Table data={data} currentUser={currentUser} />
    </div>
  );
};
export default CreatePage;

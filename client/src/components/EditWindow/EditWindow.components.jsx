import Title from "../Title/Title";
import "./EditWindow.styles.css";
const EditWindow = ({ children, title }) => {
  return (
    <div className="edit-window">
      <div className="window">
        <Title variant="h4">{title}</Title>
        {children}
      </div>
    </div>
  );
};
export default EditWindow;

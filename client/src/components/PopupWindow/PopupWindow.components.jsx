import Title from "../Title/Title";
import "./PopupWindow.styles.css";
const PopupWindow = ({ children, title, titleSize }) => {
	return (
		<div className="edit-window">
			<div className="window">
				<Title variant={titleSize}>{title}</Title>
				{children}
			</div>
		</div>
	);
};
export default PopupWindow;

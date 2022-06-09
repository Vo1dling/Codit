import CustomInput from "../../components/CustomInput/CustomInput.components";
import CustomButton from "../../components/CustomButton/CustomButton.components";
import "./LoginPage.styles.css";
import { useHistory } from "react-router-dom";

const LoginPage = ({ inputRefs, onLogin }) => {
  const { emailInputRef, passInputRef } = inputRefs;
  const history = useHistory();
  const handleOnFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const user = await onLogin();
      if (user.hasOwnProperty("name")) history.push("/taskTable");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="form-container" onSubmit={handleOnFormSubmit}>
      <form>
        <div className="input-container">
          <label>Email</label>
          <CustomInput
            placeHolder="Enter Email..."
            required
            inputRef={emailInputRef}
          />
        </div>
        <div className="input-container">
          <label>Password</label>
          <CustomInput
            type="password"
            placeHolder="Enter Password..."
            required
            inputRef={passInputRef}
          />
        </div>
        <CustomButton type="submit" text="Login" />
      </form>
    </div>
  );
};
export default LoginPage;

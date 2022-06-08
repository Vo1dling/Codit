import CustomInput from "../../components/CustomInput/CustomInput.components";
import { Link, useHistory } from "react-router-dom";
import CustomButton from "../../components/CustomButton/CustomButton.components";
import moment from "moment";
import "./SignUpPage.styles.css";
const SignUpPage = ({ onSignup, inputRefs, loggedIn, currentUser }) => {
  const {
    emailInputRef,
    passInputRef,
    nameInputRef,
    dateInputRef,
    idInputRef,
  } = inputRefs;

  let formattedBirthDate = moment(currentUser.dateOfBirth).format("YYYY-MM-DD");
  if (!currentUser.dateOfBirth) {
    formattedBirthDate = "";
  }

  const history = useHistory();
  const handleOnFormSubmit = async (e) => {
    try {
      e.preventDefault();
      await onSignup();
      if (window.localStorage.getItem("token")) {
        history.push("/");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="form-container" onSubmit={handleOnFormSubmit}>
      <form>
        <div className="input-container">
          <label>Name</label>
          <CustomInput
            inputRef={nameInputRef}
            placeHolder="Enter Name..."
            required
          />
        </div>
        <div className="input-container">
          <label>Email</label>
          <CustomInput
            inputRef={emailInputRef}
            placeHolder="Enter Email..."
            required
          />
        </div>
        <div className="input-container">
          <label>Password</label>
          <CustomInput
            type="password"
            inputRef={passInputRef}
            placeHolder="Enter Password..."
            required
          />
        </div>
        <div className="input-container">
          <label>Date Of Birth</label>
          <CustomInput
            type="date"
            inputRef={dateInputRef}
            placeHolder="Enter Date..."
            required
            value={formattedBirthDate}
          />
        </div>
        <div className="input-container">
          <label>ID Number</label>
          <CustomInput
            inputRef={idInputRef}
            placeHolder="Enter ID Number..."
            required
          />
        </div>
        <CustomButton type="submit" text="Signup" />
        <Link className="login" to="/login">
          Already have an account? <span className="login-link"> Login </span>
        </Link>
      </form>
    </div>
  );
};
export default SignUpPage;

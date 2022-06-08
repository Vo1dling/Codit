import CustomInput from "../../components/CustomInput/CustomInput.components";

import "./HomePage.styles.css";
const HomePage = ({ filteredData, search, data }) => {
  return (
    <div className="home-page flex">
      <div className="search-bar">
        <h2>Search For A character</h2>
        <CustomInput className="search-input" onChange={search}></CustomInput>
      </div>
      <div className="search-results"></div>
    </div>
  );
};
export default HomePage;

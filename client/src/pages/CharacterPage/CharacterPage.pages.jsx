import { Link } from "react-router-dom";
import api from "../../components/api/api";
import "./CharacterPage.styles.css";
const CharacterPage = ({ char, setID, setEdit, getData, currentUser }) => {
  const editbutton = () => {
    setID(char._id);
    setEdit(true);
  };

  const deleteItem = async () => {
    await api.delete(char._id);
    getData();
  };
  return (
    <div className="character-page">
      <div className="grid-container">
        <div className="paragraph-container para1">
          <h2 className="para-title">{char.title1}</h2>
          <hr />
          <p className="para-content">{char.content1}</p>
        </div>
        <div className="card-container">
          <img className="character-image" src={char.imageURL} alt="" />
          <p className="char name">Character Name : {char.name}</p>
          <p className="char origin">Character Origin : {char.origin}</p>
          <p className="char region">Character Region : {char.region}</p>
          <p className="char author">Author : {char.author}</p>
        </div>
        <div className="paragraph-container para2">
          <h2 className="para-title">{char.title2}</h2>
          <hr />
          <p className="para-content">{char.content2}</p>
        </div>
        <div className="paragraph-container para3">
          <h2 className="para-title">{char.title3}</h2>
          <hr />
          <p className="para-content">{char.content3}</p>
        </div>
        {currentUser.hasOwnProperty("name") &&
          currentUser._id === char.creatorid && (
            <Link onClick={editbutton} className="edit" to="/create">
              Edit
            </Link>
          )}
        {currentUser.hasOwnProperty("name") &&
          currentUser._id === char.creatorid && (
            <Link onClick={deleteItem} className="delete" to="/">
              Delete
            </Link>
          )}
      </div>
    </div>
  );
};
export default CharacterPage;

import React from "react";
import { Link } from "react-router-dom";
import "./Header.styles.css";
const Header = ({ user, logout }) => {
  return (
    <nav>
      <Link to="/">Home Page</Link>
      {user.hasOwnProperty("name") && (
        <Link to="/create">Create/Edit Page</Link>
      )}
      <Link to="/flash">Flash Cards</Link>
      {!user.hasOwnProperty("name") && (
        <div className="account-buttons">
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
      {user.hasOwnProperty("name") && (
        <div className="account-buttons">
          <p className="user">Welcome {user.name}</p>
          <Link onClick={logout} to="/">
            Logout
          </Link>
        </div>
      )}
    </nav>
  );
};
export default Header;

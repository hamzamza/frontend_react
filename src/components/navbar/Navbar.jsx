import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
function Navbar() {
  const { user } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to={"/"} style={{ color: "inherit", textDecoration: "inherit" }}>
          <span className="logo">ASIFbooking</span>
        </Link>
        {!user ? (
          <div className="navItems">
            <Link
              to={"/login"}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <button className="navButton">Login</button>
            </Link>
            <Link
              to={"/register"}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <button className="navButton">Register</button>
            </Link>
          </div>
        ) : (
          <div className="navItems">{user.username}</div>
        )}
      </div>
    </div>
  );
}

export default Navbar;

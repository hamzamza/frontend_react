import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/authContext";
import "./login.css";
function Login() {
  const LOGIN_START = "LOGIN_START";
  const LOGIN_SUCCESS = "LOGIN_SUCCESS";
  const LOGIN_FAILER = "LOGIN_FAILER";
  const LOGOUT = "logout";
  const navigagte = useNavigate();
  //

  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const { loading, error, dispatch } = useContext(AuthContext);
  /*const handelChange = (e) => {
    switch (e.taget.id) {
      case "username":
        setCredentials({ username: e.taget.value });
        break;
      case "password":
        setCredentials({ password: e.taget.value });
        break;
      default:
        break;
    }
  };*/
  const handelChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handelClick = async (e) => {
    e.preventDefault();

    dispatch({ type: LOGIN_START });
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        credentials
      );
      await dispatch({ type: LOGIN_SUCCESS, payload: response.data.details });
      console.log("loged in");
      navigagte("/");
    } catch (er) {
      console.log(er);
      dispatch({ type: LOGIN_FAILER, payload: er.response.data });
    }
  };
  return (
    <div>
      <Navbar />
      <Header search={false} />
      <div className="login">
        <div className="lContainer">
          <div className="lheader">login</div>
          <input
            type="text"
            className="lIncput"
            onChange={handelChange}
            id="username"
            placeholder="username"
          />
          <input
            type="password"
            className="lIncput"
            onChange={handelChange}
            id={"password"}
            placeholder="password"
          />
          <button className="lButton" disabled={loading} onClick={handelClick}>
            login
          </button>

          {error && <span className="error">{error.msg}</span>}
        </div>
      </div>
    </div>
  );
}

export default Login;

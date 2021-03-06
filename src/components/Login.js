import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const Login = ({ setLoginModal, server, setUser, setSignupModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const history = useHistory();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(`${server}/user/login`, {
        email: email,
        password: password,
      });
      setUser(response.data.token);
      setLoginModal(false);
      if (location.pathname.match("/favorites")) {
        history.push(`/favorites/${Cookies.get("userToken")}`);
      }
    } catch (error) {
      setErrorMessage("Email or password invalid");
      console.log(error.message);
    }
  };

  return (
    <div className="modal">
      <div className="modal-wrapper">
        <div
          onClick={() => {
            if (location.pathname.match("/favorites")) {
              history.push("/");
              setLoginModal(false);
            } else {
              setLoginModal(false);
            }
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            type="password"
            value={password}
            placeholder="••••••••••••"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <button type="submit">Confirm</button>
        </form>
        <span style={{ color: "red", fontSize: 12, marginBottom: 10 }}>{errorMessage}</span>
        <button
          onClick={() => {
            setLoginModal(false);
            setSignupModal(true);
          }}
        >
          No account yet ? Signup !
        </button>
      </div>
    </div>
  );
};

export default Login;

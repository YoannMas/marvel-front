import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import PasswordInput from "./PasswordInput";

const Signup = ({ setLoginModal, setSignupModal, server, setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const location = useLocation();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (password === checkPassword) {
        const response = await axios.post(`${server}/user/signup`, {
          username: username,
          email: email,
          password: password,
        });
        setUser(response.data.token);
        setSignupModal(false);
      } else {
        setErrorMessage("Passwords do not match");
      }
    } catch (error) {
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
              setSignupModal(false);
            } else {
              setSignupModal(false);
            }
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <h3>Signup</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            placeholder="Enter your username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <PasswordInput password={password} setPassword={setPassword} />
          <PasswordInput
            password={checkPassword}
            setPassword={setCheckPassword}
          />
          <button type="submit">Confirm</button>
        </form>
        <span style={{ color: "red", fontSize: 12, marginBottom: 10 }}>
          {errorMessage}
        </span>
        <button
          onClick={() => {
            setSignupModal(false);
            setLoginModal(true);
          }}
        >
          You already have an account ?
        </button>
      </div>
    </div>
  );
};

export default Signup;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";

const Login = ({ setLoginModal, server, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(`${server}/user/login`, {
        email: email,
        password: password,
      });
      setUser(response.data.token);
      setLoginModal(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="modal">
      <div className="modal-wrapper">
        <div
          onClick={() => {
            setLoginModal(false);
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
            placeholder="Enter your password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <button type="submit">Confirm</button>
        </form>
        <button>No account yet ? Signup !</button>
      </div>
    </div>
  );
};

export default Login;

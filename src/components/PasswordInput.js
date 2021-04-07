import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const PasswordInput = ({ setPassword, password }) => {
  const [eye, setEye] = useState(faEye);

  const showPassword = () => {
    if (eye === faEye) {
      setEye(faEyeSlash);
    } else {
      setEye(faEye);
    }
  };

  return (
    <div className="password">
      <input
        className="password"
        type={eye === faEye ? "password" : "text"}
        value={password}
        placeholder="Enter your password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <FontAwesomeIcon
        icon={eye}
        onClick={() => {
          showPassword();
        }}
      />
    </div>
  );
};

export default PasswordInput;

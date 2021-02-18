import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import Login from "../components/Login";

const Header = ({ loginModal, setLoginModal, signupModal, setSignupModal, server, setUser }) => {
  return (
    <div className="header">
      {loginModal && (
        <Login setLoginModal={setLoginModal} signupModal={signupModal} setSignupModal={setSignupModal} server={server} setUser={setUser} />
      )}
      <div className="container">
        <div>
          <Link to="/">
            <img src={logo} alt="Marvel's logo" />
          </Link>
          <Link to="/">Characters</Link>
          <Link to="/comics">Comics</Link>
          <Link>Favorites</Link>
        </div>
        <button
          onClick={() => {
            setLoginModal(true);
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Header;

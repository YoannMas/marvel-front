import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <div>
          <Link to="/">
            <img src={logo} alt="Marvel's logo" />
          </Link>
          <Link to="/">Characters</Link>
          <Link to="/comics">Comics</Link>
          <Link>Favorites</Link>
        </div>
        <button>Login</button>
      </div>
    </div>
  );
};

export default Header;

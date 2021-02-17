import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <div>
          <img src={logo} alt="Marvel's logo" />
          <Link to="/characters">Personnages</Link>
          <Link>Comics</Link>
          <Link>Favoris</Link>
        </div>
        <button>Se connecter</button>
      </div>
    </div>
  );
};

export default Header;

import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Cookies from "js-cookie";
import { useEffect } from "react";

const Header = ({ loginModal, setLoginModal, signupModal, setSignupModal, server, setUser, added, userToken }) => {
  useEffect(() => {}, [added]);

  return (
    <>
      {loginModal && <Login setLoginModal={setLoginModal} setSignupModal={setSignupModal} server={server} setUser={setUser} />}
      {signupModal && <Signup setLoginModal={setLoginModal} setSignupModal={setSignupModal} server={server} setUser={setUser} />}
      <div className="header">
        <div className="container">
          <div>
            <Link to="/">
              <img src={logo} alt="Marvel's logo" />
            </Link>
            <Link to="/">Characters</Link>
            <Link to="/comics">Comics</Link>
            <Link to={`/favorites/${Cookies.get("userToken")}`} className={added ? "added" : undefined}>
              Favorites
            </Link>
          </div>
          <button
            onClick={() => {
              userToken ? setUser(null) : setLoginModal(true);
            }}
          >
            {userToken ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;

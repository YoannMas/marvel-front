import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Header = ({
  loginModal,
  setLoginModal,
  signupModal,
  setSignupModal,
  server,
  setUser,
  added,
  userToken,
  setPage,
}) => {
  const history = useHistory();
  useEffect(() => {}, [added]);

  // Back to page 1 on click
  const resetPage = () => {
    setPage(1);
  };

  return (
    <>
      {/* Display modal Login and Signup */}
      {loginModal && (
        <Login
          setLoginModal={setLoginModal}
          setSignupModal={setSignupModal}
          server={server}
          setUser={setUser}
        />
      )}
      {signupModal && (
        <Signup
          setLoginModal={setLoginModal}
          setSignupModal={setSignupModal}
          server={server}
          setUser={setUser}
        />
      )}
      <div className="header">
        <div className="container">
          <div>
            <Link to="/" onClick={resetPage}>
              <img src={logo} alt="Marvel's logo" />
            </Link>
            <Link to="/characters" onClick={resetPage}>
              Characters
            </Link>
            <Link to="/comics" onClick={resetPage}>
              Comics
            </Link>
            <Link
              // Animation on Favorites button when something added in fav
              // If not logged, open modal
              to={`/favorites/${Cookies.get("userToken")}`}
              className={added ? "added" : undefined}
              onClick={() => {
                !userToken && setLoginModal(true);
              }}
            >
              Favorites
            </Link>
          </div>
          <button
            onClick={() => {
              if (userToken) {
                setUser(null);
                history.push("/");
              } else {
                setLoginModal(true);
              }
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

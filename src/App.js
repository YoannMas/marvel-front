import "./App.scss";
import Header from "./components/Header";
import Characters from "./containers/Characters";
import Comics from "./containers/Comics";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import Favorites from "./containers/Favorites";

// switch on local or prod
const server = "https://marvel-node.herokuapp.com";
// https://marvel-node.herokuapp.com
// http://localhost:3001

function App() {
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [added, setAdded] = useState(false);
  const [page, setPage] = useState(1);
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);

  const setUser = (token) => {
    if (token) {
      console.log(token);
      Cookies.set("userToken", token, { expires: 7 });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };

  return (
    <div className="App">
      <Router>
        <Header
          loginModal={loginModal}
          setLoginModal={setLoginModal}
          signupModal={signupModal}
          setSignupModal={setSignupModal}
          server={server}
          setUser={setUser}
          added={added}
          userToken={userToken}
          setPage={setPage}
        />
        <Switch>
          {/* id - conditionnal params */}
          <Route path="/comics/:id?">
            <Comics server={server} setAdded={setAdded} setLoginModal={setLoginModal} page={page} setPage={setPage} />
          </Route>
          <Route path="/favorites/:token">
            <Favorites server={server} />
          </Route>
          <Route path="/">
            <Characters server={server} setAdded={setAdded} setLoginModal={setLoginModal} page={page} setPage={setPage} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

import "./App.scss";
import Header from "./components/Header";
import Characters from "./containers/Characters";
import Comics from "./containers/Comics";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// switch on local or prod
const server = "http://localhost:3001";

function App() {
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);

  const setUser = (token) => {
    if (token) {
      console.log(token);
      Cookies.set("userToken", token, { expires: 7 });
      setUserToken(null);
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
        />
        <Switch>
          {/* id - conditionnal params */}
          <Route path="/comics/:id?">
            <Comics server={server} />
          </Route>
          <Route path="/">
            <Characters server={server} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

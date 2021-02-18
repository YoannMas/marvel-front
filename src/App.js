import "./App.scss";
import Header from "./components/Header";
import Characters from "./containers/Characters";
import Comics from "./containers/Comics";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";

// switch on local or prod
const server = "http://localhost:3001";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
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

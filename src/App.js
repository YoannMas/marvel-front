import "./App.scss";
import Header from "./components/Header";
import Characters from "./containers/Characters";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const server = "http://localhost:3001";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/characters">
            <Characters server={server} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

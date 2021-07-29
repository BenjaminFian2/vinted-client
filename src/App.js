import "./App.css";

//import components
import Header from "./components/Header";
import Signup from "./containers/Signup";
import Login from "./containers/Login";

//import from react-router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./containers/Home";
import Offer from "./containers/Offer";

import { useState } from "react";

import Coockies from "js-cookie";

// import and add font awesome icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch);

function App() {
  const [token, setToken] = useState(Coockies.get("token") || null);

  const setUser = (token) => {
    Coockies.set("token", token, { expires: 1 });
    setToken(token);
  };
  return (
    <Router>
      <Header token={token} />
      <Switch>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <Login setUser={setUser} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

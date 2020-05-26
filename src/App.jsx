// Libraries
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Component Imports
import Home from "./pages/Home";
import Biseccion from "./pages/Biseccion";
import Newton from "./pages/Newton";
import Secante from "./pages/Secante";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/metodo/biseccion" component={Biseccion} />
        <Route exact path="/metodo/newton" component={Newton} />
        <Route exact path="/metodo/secante" component={Secante} />

        <Route component={() => <h1>404 page not found</h1>} />
      </Switch>
    </Router>
  );
}

export default App;

// Libraries
// import * as serviceWorker from "./serviceWorker";
import React from "react";
import { render } from "react-dom";

// Styles
import "./index.css";

// Component Imports
import App from "./App";

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// Leaving this in case we want to implement a service worker
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

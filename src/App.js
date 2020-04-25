import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
// import logo from "./logo.svg";
import "./App.css";

import ResourceList from "./ResourceList";
import ReactRouter from "./ReactRouter";

function App() {
  return (
    <Router>
      <div className="App">
        <ul style={{ textAlign: "left", listStyleType: "none" }}>
          <li>
            <NavLink to="/" exact>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/ResourceList" exact>
              Resource List
            </NavLink>
          </li>
        </ul>
        {/* <Prompt
          when={!this.state.loggedIn}
          message={(location) => {
            return location.pathname.startsWith("/user")
              ? "Are you sure?"
              : true;
          }}
        /> */}

        <Route
          exact
          path="/"
          render={() => {
            return <h1>Main Page</h1>;
          }}
        />
        <Route exact path="/resourcelist" component={ResourceList} />
        <Route exact path="/resourcelist/reactrouter" component={ReactRouter} />
      </div>
    </Router>
  );
}

export default App;

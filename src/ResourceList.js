import React from "react";
import "./App.css";
import { NavLink } from "react-router-dom";

export default function ResourceList() {
  return (
    <div>
      <h3>Resource List</h3>
      <h4>click on a resource below to find out more</h4>
      <ul style={{ listStyleType: "none" }}>
        <li>
          <NavLink exact to="/resourcelist/reactrouter">
            React Router
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/">
            React Hooks
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/">
            React Redux
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/">
            ES6
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/">
            Mapbox
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

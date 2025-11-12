import React from "react";
import { NavLink } from "react-router-dom";

const activeStyle = {
  fontWeight: "bold",
  textDecoration: "underline",
};

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="/"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            end
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/posts"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Posts
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/nav-demo"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            NavLink demo
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/navigate-demo"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            useNavigate demo
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/params-demo/42?ref=navbar"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            params & location demo
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/protected"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Protected
          </NavLink>
        </li>
        <li>
          <a href="/traditional/index.html">Without React Router</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

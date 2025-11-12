import React from "react";
import { NavLink } from "react-router-dom";

const NavDemo = () => {
  return (
    <div>
      <h2>NavLink demo</h2>
      <p>NavLink applies an active style to the currently matched link.</p>
      <ul>
        <li>
          <NavLink to="/" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/posts">Posts</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavDemo;

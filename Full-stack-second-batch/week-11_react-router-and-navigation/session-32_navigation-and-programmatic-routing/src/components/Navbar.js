import React from "react";
import { Link } from "react-router-dom";

const activeStyle = {
  fontWeight: "bold",
  textDecoration: "underline",
};

const bar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link
            to="/"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/about"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/posts"
          >
            Posts
          </Link>
        </li>
        <li>
          <Link
            to="/nav-demo"
          >
            Link demo
          </Link>
        </li>
        <li>
          <Link
            to="/navigate-demo"
          >
            useNavigate demo
          </Link>
        </li>
        <li>
          <Link
            to="/params-demo/42?ref=navbar"
          >
            params & location demo
          </Link>
        </li>
        <li>
          <Link
            to="/protected"
          >
            Protected
          </Link>
        </li>
        <li>
          <a href="/traditional/index.html">Without React Router</a>
        </li>
      </ul>
    </nav>
  );
};

export default bar;

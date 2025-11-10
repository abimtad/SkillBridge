import React, { useState } from "react";
import Home from "./Home";
import About from "./About";
import Posts from "./Posts";

const NoRouter = () => {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    if (page === "home") {
      return <Home />;
    } else if (page === "about") {
      return <About />;
    } else if (page === "posts") {
      return <Posts />;
    }
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <button onClick={() => setPage("home")}>Home</button>
          </li>
          <li>
            <button onClick={() => setPage("about")}>About</button>
          </li>
          <li>
            <button onClick={() => setPage("posts")}>Posts</button>
          </li>
        </ul>
      </nav>
      {renderPage()}
    </div>
  );
};

export default NoRouter;

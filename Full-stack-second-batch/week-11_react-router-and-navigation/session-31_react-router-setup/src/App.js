import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Posts from "./components/Posts";
import Post from "./components/Post";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/posts" element={<Posts />}>
              <Route path=":postId" element={<Post />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

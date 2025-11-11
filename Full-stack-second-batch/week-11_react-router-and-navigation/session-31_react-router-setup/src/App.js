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
        main app
      </div>
    </Router>
  );
}

export default App;

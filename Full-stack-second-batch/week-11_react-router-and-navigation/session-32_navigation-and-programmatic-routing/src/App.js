import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Posts from "./components/Posts";
import Post from "./components/Post";
import NavDemo from "./components/NavDemo";
import NavigateDemo from "./components/NavigateDemo";
import ParamsLocationDemo from "./components/ParamsLocationDemo";
import { AuthProvider } from "./components/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedPage from "./components/ProtectedPage";
import Login from "./components/Login";

import "./App.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/posts" element={<Posts />}>
                <Route path=":postId" element={<Post />} />
              </Route>

              {/* Demo pages */}
              <Route path="/nav-demo" element={<NavDemo />} />
              <Route path="/navigate-demo" element={<NavigateDemo />} />
              <Route path="/params-demo/:id" element={<ParamsLocationDemo />} />

              {/* Protected route */}
              <Route
                path="/protected"
                element={
                  <ProtectedRoute>
                    <ProtectedPage />
                  </ProtectedRoute>
                }
              />

              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

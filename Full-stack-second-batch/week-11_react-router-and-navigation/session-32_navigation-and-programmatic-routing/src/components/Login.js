import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const Login = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  // Where to go after login. Default to home.
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.signin(username || "demo-user", () => {
      navigate(from, { replace: true });
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <p>You must log in to view the protected page.</p>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default Login;

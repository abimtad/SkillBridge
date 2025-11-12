import React from "react";
import { useNavigate } from "react-router-dom";

const NavigateDemo = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>useNavigate demo</h2>
      <p>Click the buttons to navigate programmatically.</p>
      <button onClick={() => navigate(-1)}>Go back</button>
      <button onClick={() => navigate("/posts")}>Go to posts</button>
      <button onClick={() => navigate("/posts/2")}>Open Post 2</button>
      <button onClick={() => navigate("/params-demo/99?from=navigate-demo")}>
        Params example
      </button>
    </div>
  );
};

export default NavigateDemo;

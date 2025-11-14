import React from "react";
import Seo from "../components/Seo";

const Home = () => {
  return (
    <div className="page-container">
      <Seo
        title="Home Page"
        description="Welcome to the home page of our advanced routing demo."
      />
      <h1>Home Page</h1>
      <p>This is the main page of the application.</p>
    </div>
  );
};
export default Home;

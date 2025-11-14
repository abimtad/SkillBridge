import React from "react";
import Seo from "../components/Seo";

const About = () => {
  return (
    <div className="page-container">
      <Seo
        title="About Page"
        description="Learn more about us on the about page."
      />
      <h1>About Page</h1>
      <p>This page is lazy-loaded for code-splitting.</p>
    </div>
  );
};
export default About;

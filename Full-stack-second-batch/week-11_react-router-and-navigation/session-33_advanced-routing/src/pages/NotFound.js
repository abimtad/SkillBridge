import React from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";

const NotFound = () => {
  return (
    <div className="page-container">
      <Seo
        title="404 - Not Found"
        description="The page you are looking for does not exist."
      />
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
};
export default NotFound;

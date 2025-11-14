import React from "react";
import { useParams } from "react-router-dom";
import Seo from "../components/Seo";

const Profile = () => {
  const { username } = useParams();

  // Example of a component that can throw an error
  if (username === "error") {
    throw new Error("This is a simulated error in the Profile component.");
  }

  return (
    <div className="page-container">
      <Seo
        title={`${username}'s Profile`}
        description={`View the profile for ${username}.`}
      />
      <h1>Profile Page</h1>
      <p>Hello, {username}!</p>
      <p>This is a dynamic route.</p>
    </div>
  );
};
export default Profile;

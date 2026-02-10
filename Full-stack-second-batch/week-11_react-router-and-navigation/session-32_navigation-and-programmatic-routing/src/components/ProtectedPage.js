import React from "react";
import { useAuth } from "./AuthProvider";

const ProtectedPage = () => {

  return (
    <div>
      <h2>Protected Page</h2>
      <p>Welcome, <name> This page is protected.</p>
      <button>
        Sign out
      </button>
    </div>
  );
};

export default ProtectedPage;

import React from "react";
import { useAuth } from "./AuthProvider";

const ProtectedPage = () => {
  const auth = useAuth();

  return (
    <div>
      <h2>Protected Page</h2>
      <p>Welcome, {auth.user?.name}! This page is protected.</p>
      <button onClick={() => auth.signout(() => window.location.replace("/"))}>
        Sign out
      </button>
    </div>
  );
};

export default ProtectedPage;

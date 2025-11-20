import React from "react";
import { useAuthStore } from "../state/authStore.js";
import { useRenderCount } from "./useRenderCount.js";

export default function AuthPanel() {
  useRenderCount("AuthPanel");
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);
  const login = useAuthStore((s) => s.login);
  const logout = useAuthStore((s) => s.logout);
  const isAuthed = useAuthStore((s) => s.isAuthenticated());

  return (
    <div className="panel">
      <h2>Auth Store (persisted)</h2>
      {isAuthed ? (
        <>
          <p>
            Logged in as <strong>{user?.name}</strong>
          </p>
          <p style={{ wordBreak: "break-all" }}>
            Token: <code>{token}</code>
          </p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button
          onClick={() =>
            login("demo-token-" + Date.now(), { id: "u1", name: "Ada Dev" })
          }
        >
          Login
        </button>
      )}
      <small>Only token + user persisted; actions are not stored.</small>
    </div>
  );
}

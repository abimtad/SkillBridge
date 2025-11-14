import React, { Suspense } from "react";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const About = React.lazy(() => import("./pages/About"));
const Profile = React.lazy(() => import("./pages/Profile"));

const routesConfig = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: (
      <Suspense fallback={<div className="loading-fallback">Loading...</div>}>
        <About />
      </Suspense>
    ),
  },
  {
    path: "/profile/:username",
    element: (
      <Suspense fallback={<div className="loading-fallback">Loading...</div>}>
        <Profile />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routesConfig;

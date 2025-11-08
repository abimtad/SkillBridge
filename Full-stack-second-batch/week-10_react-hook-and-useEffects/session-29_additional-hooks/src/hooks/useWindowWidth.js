import { useState, useEffect } from "react";

function useWindowWidth() {
<<<<<<< HEAD
  // This custom hook will track the window width.
  // We will use useState to store the width.
  // We will use useEffect to add and clean up a resize event listener.
  return 0; // We will return the width
=======
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
>>>>>>> finished-app
}

export default useWindowWidth;

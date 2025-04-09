import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

function App() {
  const [score, setScore] = useState(0);
  let startY = null;

  useEffect(() => {
    const handleTouchStart = (e) => {
      startY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (startY === null) return;
      const endY = e.changedTouches[0].clientY;
      const deltaY = endY - startY;

      if (deltaY < -30) {
        setScore((prev) => prev + 1); // swipe up
      } else if (deltaY > 30) {
        setScore((prev) => Math.max(0, prev - 1)); // swipe down
      }

      startY = null;
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px", fontSize: "2rem" }}>
      <h1>Score: {score}</h1>
      <p>Swipe up to increase, down to decrease</p>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);

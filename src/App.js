import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GreencolorBox from "./components/GreencolorBox";
import UserRegForm from "./components/UserRegForm";

function App() {
  const [gameLevel, setGameLevel] = useState("easy"); // Default game level

  // Function to set the game level from Register component
  const handleGameLevelChange = (level) => {
    setGameLevel(level);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <UserRegForm
              onGameLevelChange={handleGameLevelChange}
              initialGameLevel={gameLevel}
            />
          }
        />
        <Route
          path="/greencolorbox/:difficulty"
          element={<GreencolorBox gameLevel={gameLevel} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

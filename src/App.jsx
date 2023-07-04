import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainMenu from "./Components/MainMenu/MainMenu";
import BarMenu from "./Components/BarMenu/BarMenu";
import DishDetails from "./Components/DishDetails/DishDetails";
import BarDetails from "./Components/BarDetails/BarDetails";
import DishMenu from "./Components/DishMenu/DishMenu.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/bar-menu/" element={<BarMenu />} />
        <Route path="/dish-menu/" element={<DishMenu />} />
        <Route path="/dish/:id" element={<DishDetails />} />
        <Route path="/bar/:id" element={<BarDetails />} />
      </Routes>
    </>
  );
}

export default App;

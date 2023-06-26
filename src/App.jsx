import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainMenu from "./Components/MainMenu/MainMenu";
import ScrollableDishMenu from "./SkrollDishMenu";
import BarMenu from "./Components/BarMenu/BarMenu";
import DishDetails from "./Components/DishDetails/DishDetails";
import BarDetails from "./Components/BarDetails/BarDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/BarMenu/" element={<BarMenu />} />
        <Route path="/DishMenu/" element={<ScrollableDishMenu />} />
        <Route path="/dish/:id" element={<DishDetails />} />
        <Route path="/bar/:id" element={<BarDetails />} />
      </Routes>
    </>
  );
}

export default App;

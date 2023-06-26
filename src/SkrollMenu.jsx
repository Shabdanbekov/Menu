import React from "react";
import DishMenu from "./Components/DishMenu/DishMenu";
import DishMenuTwo from "./Components/DishMenuTwo/DishMenuTwo";

const ScrollableDishMenu = () => {
  return (
    <div style={{ overflowY: "scroll", maxHeight: "600px" }}>
      <DishMenu />
      <DishMenuTwo />
    </div>
  );
};

export default ScrollableDishMenu;

// укороти код весь этот функционал должен работать на одном компоненте

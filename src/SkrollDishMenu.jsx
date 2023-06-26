import React from "react";
import DishMenu from "./Components/DishMenu/DishMenu";

const ScrollableDishMenu = () => {
  return (
    <div style={{ overflowY: "scroll", maxHeight: "600px" }}>
      <DishMenu category={7} />
      <DishMenu category={8} />
      <DishMenu category={9} />
      <DishMenu category={10} />
      <DishMenu category={11} />
      <DishMenu category={12} />
      <DishMenu category={13} />
      <DishMenu category={14} />
      <DishMenu category={15} />
      <DishMenu category={16} />
    </div>
  );
};

export default ScrollableDishMenu;

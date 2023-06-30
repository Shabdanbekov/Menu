import React from "react";
import { NavLink } from "react-router-dom";
import style from "../MainMenu/MainMenu.module.css";

const MainMenu = () => {
  return (
    <div className={style.container}>
      <div className={style.dish}>
        <NavLink to={"/DishMenu/"} className={style.navItem}>
          <div className={style.text}></div>
        </NavLink>
      </div>
      <div className={style.bar}>
        <NavLink to={"/BarMenu/"} className={style.navItem}>
          <div className={style.text}></div>
        </NavLink>
      </div>
      <img src="/circle.png" alt="" className={style.circle} />
    </div>
  );
};

export default MainMenu;

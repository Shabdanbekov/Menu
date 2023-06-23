import React from "react";
import { NavLink } from "react-router-dom";
import s from "../MainMenu/MainMenu.module.css";

const MainMenu = () => {
  return (
    <div className={s.background}>
      <h1>SOULIST</h1>
      <div className={s.nav}>
        <NavLink to={"/FoodMenu/"} className={s.navItem}>
          КУХНЯ
        </NavLink>
        <NavLink to={"/BarMenu/"} className={s.navItem}>
          БАР
        </NavLink>
      </div>
    </div>
  );
};

export default MainMenu;

import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import style from "../MainMenu/MainMenu.module.css";

const MainMenu = () => {
  return (
    <div className={style.container}>
      <div className={style.leftSection}>
        <NavLink to={"/bar-menu/"} className={style.navItem}></NavLink>
      </div>
      <div className={style.circle}>
        <img src="/sk.png" alt="" className={style.rotatingImage} />
      </div>
      <div className={style.rightSection}>
        <NavLink to={"/dish-menu/"} className={style.navItem}></NavLink>
      </div>
    </div>
  );
};

export default MainMenu;

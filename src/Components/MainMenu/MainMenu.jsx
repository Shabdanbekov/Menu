import React from "react";
import { NavLink } from "react-router-dom";
import style from "../MainMenu/MainMenu.module.css";

const MainMenu = () => {
  return (
    <div className={style.container}>
      <div className={style.dish}>
        <NavLink to={"/DishMenu/"} className={style.navItem}>
          <img src="/grill.png" alt="" className={style.image} />
        </NavLink>
      </div>
      <div className={style.bar}>
        <NavLink to={"/BarMenu/"} className={style.navItem}>
          <img src="/Group 19.svg" alt="" className={style.image} />
        </NavLink>
      </div>
      <div className={style.circleWrapper}>
        <video autoPlay loop muted className={style.circle}>
          <source src="/CircleVideo.MP4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default MainMenu;

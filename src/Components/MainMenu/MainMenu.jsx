import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import cn from "classnames";

import left from "../../assets/backgrounds/left.png";
import center from "../../assets/backgrounds/center.jpg";
import right from "../../assets/backgrounds/right.jpg";
import blackLogo from "../../assets/backgrounds/black-logo.png";

import style from "../MainMenu/MainMenu.module.css";

const MainMenu = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
  }, []);

  return (
    <div className={style.container}>
        {/*<NavLink to={"/bar-menu/"} className={style.navItem}></NavLink>*/}
      <div
        className={cn(style.container_circle, {
          [style.done]: isLoaded,
        })}
      >
        <img src={blackLogo} className={style.circle} alt="logo" />
      </div>
      <div className={style.bg_imgs}>
        <NavLink
          to="/bar-menu"
          className={cn(style.bg_imgs_wrap, {
            [style.left]: true,
            [style.done]: isLoaded,
          })}
        >
          <img src={left} alt="yellow" className={style.bg_img} />
          <div>
            <span className={style.bg_img_title}>БАР</span>
          </div>
        </NavLink>
        <NavLink
          to="dish-menu"
          className={cn(style.bg_imgs_wrap, {
            [style.center]: true,
            [style.done]: isLoaded,
          })}
        >
          <img src={center} alt="green" className={style.bg_img} />
          <div>
            <span className={style.bg_img_title}>МЕНЮ</span>
          </div>
        </NavLink>
        <div
          className={cn(style.bg_imgs_wrap, {
            [style.right]: true,
            [style.done]: isLoaded,
          })}
        >
          <img src={right} alt="blue" className={style.bg_img} />
          <div>
            <span className={style.bg_img_title_wine}>ВИННАЯ</span>
            <br />
            <span className={style.bg_img_title}>КАРТА</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;

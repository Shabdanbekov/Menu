import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import style from "../MainMenu/MainMenu.module.css";

const MainMenu = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    videoRef.current.addEventListener("loadedmetadata", handleVideoLoaded);
  }, []);

  const handleVideoLoaded = () => {
    videoRef.current.play();
  };

  return (
    <div className={style.container}>
      <div className={style.leftSection}>
        <NavLink to={"/BarMenu/"} className={style.navItem}></NavLink>
      </div>
      <video
        ref={videoRef}
        className={style.roundVideo}
        src="/circle.mp4"
        autoPlay
        loop
        muted
      ></video>
      <div className={style.rightSection}>
        <NavLink to={"/DishMenu/"} className={style.navItem}></NavLink>
      </div>
    </div>
  );
};

export default MainMenu;

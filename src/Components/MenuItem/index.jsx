import React, { forwardRef } from "react";
import { NavLink } from "react-router-dom";
import cn from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

import bg from "../../assets/backgrounds/bg.png";

import styles from "./index.module.css";

export const MenuItem = forwardRef((props, ref) => {
  const { bgImage, items, title } = props;

  return (
    <div className={cn("page", styles.container)} data-density="soft" ref={ref}>
      <div className={styles.bg}>
        <img className={styles.img} src={bg} alt="image" />
      </div>
      <div style={{ backgroundImage: bgImage }} className={styles.title}>
        <div className={styles.title_bg}>
          <img src={bgImage} className={styles.img} />
        </div>
        <span>{title}</span>
      </div>
      <div className={styles.dishes}>
        {items?.map((item, index) => (
          <div key={index} className={styles.description}>
            <NavLink
              state={item}
              to={`/dish/${item.id}`}
              className={styles.dish_link}
            >
              <span>{item.name}</span>
            </NavLink>
            <div className={styles.prices}>
              <span>{item.weight} г.</span>
              <span>{item.price} c.</span>
            </div>
          </div>
        ))}
      </div>
      <a href="/" className={styles.linkOverlay}>
        <FontAwesomeIcon icon={faHouse} style={{ color: "#363a3a" }} />
      </a>
    </div>
  );
});

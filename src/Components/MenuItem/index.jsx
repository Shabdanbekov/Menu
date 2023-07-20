import React, { forwardRef, useMemo } from "react";
// import { NavLink } from "react-router-dom";
import cn from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

import styles from "./index.module.css";

const MenuItem = forwardRef((props, ref) => {
  const { bgImageTitle, isBar, items, title } = props;

  const itemsMemoized = useMemo(() => {
    if (!isBar) {
      return items?.map((item, index) => (
        <div key={index} className={styles.description}>
          {/* <NavLink
            // state={item}
            // to={`/dish/${item.id}`}
            className={cn(styles.dish_link, {
              [styles.bar]: isBar,
            })}
          >
          </NavLink> */}
          <span>{item.name}</span>
          <span>{item.weight}</span>
          <span>{item.price} c.</span>
        </div>
      ));
    } else {
      const subCategories = [];

      for (let i = 0; i < items.length; i++) {
        if (!items[i].menu_sub_item) continue;
        const foundCategory = subCategories.find(
          (item) => item.id === items[i].menu_sub_item.id
        );

        if (!foundCategory) {
          subCategories.push({
            id: items[i].menu_sub_item.id,
            title: items[i].menu_sub_item.title,
          });
        }
      }

      if (!subCategories.length)
        return items?.map((item, index) => (
          <div key={index} className={styles.description}>
            {/* <NavLink
              state={item}
              to={`/dish/${item.id}`}
              className={cn(styles.dish_link, {
                [styles.bar]: isBar,
              })}
            >
            </NavLink> */}
            <span>{item.name}</span>
            <span>{item.weight} </span>
            <span>{item.price} c.</span>
          </div>
        ));

      return subCategories.map((item) => {
        const filteredDishes = items.filter(
          (i) => i.menu_sub_item?.id === item.id
        );

        return (
          <div key={item.id}>
            <div className={styles.sub_title}>{item.title}</div>
            {filteredDishes.map((i, index) => (
              <div key={index} className={styles.description}>
                {/* <NavLink
                  state={i}
                  to={`/dish/${i.id}`}
                  className={cn(styles.dish_link, {
                    [styles.bar]: isBar,
                  })}
                >
                </NavLink> */}
                <span>{i.name}</span>
                <span>{i.weight} </span>
                <span>{i.price} c.</span>
              </div>
            ))}
          </div>
        );
      });
    }
  }, [isBar, items, title]);

  return (
    <div
      className={cn("page", styles.container, {
        [styles.bar]: isBar,
      })}
      data-density="soft"
      ref={ref}
    >
      <div
        style={{ backgroundImage: `url(${bgImageTitle})` }}
        className={styles.title}
      >
        <div className={styles.title_bg}>
          <img src={bgImageTitle} className={styles.img} alt="Background" />
        </div>
        <span>{title}</span>
      </div>
      <div className={styles.dishes}>{itemsMemoized}</div>

      <a href="/" className={styles.linkOverlay}>
        <FontAwesomeIcon icon={faHouse} style={{ color: "#363a3a" }} />
      </a>
    </div>
  );
});

export default MenuItem;

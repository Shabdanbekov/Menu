import React, { useEffect, useMemo, useRef, useState } from "react";
import { MenuItem } from "../MenuItem";

import styles from "./BarMenu.module.css";
import { getBackgroundColor } from "./utils.js";
import HTMLFlipBook from "react-pageflip";
import { useDimensions } from "../../utils/useDimension.js";

const BarMenu = () => {
  const ref = useRef(null);
  const { width, height } = useDimensions();
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);

  const pages = useMemo(() => {
    if (!menu.length) return [];
    const result = [];
    let mainIndex = 1;
    let menuIndex = 0;
    const menuItems = Object.assign([], menu);

    while (menuItems.length > 0) {
      const item = menuItems.pop();
      result.push(
        <MenuItem
          key={menuIndex}
          id={item.id}
          title={item.title}
          bgImage={getBackgroundColor(menuIndex)}
          items={item.dishes}
        />
      );
      menuIndex++;

      mainIndex++;
    }
    return result;
  }, [menu]);

  useEffect(() => {
    const fetchDataMenuDishes = async () => {
      try {
        setLoading(true);
        const dishesResponse = await fetch(
          `https://menu-api.soulist.kg/api/menupositions/`
        );
        const categoryResponse = await fetch(
          `https://menu-api.soulist.kg/api/menuitems/`
        );
        const dishes = await dishesResponse.json();
        const categories = await categoryResponse.json();

        const categoriesForDish = categories.filter(
          (item) => item.category === 1
        );

        const formatDishes = categoriesForDish.map((item) => {
          const dishesOfCategory = dishes.filter(
            (dish) => dish.menu_item === item.id
          );

          return { ...item, dishes: dishesOfCategory };
        });

        setMenu(formatDishes);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };

    fetchDataMenuDishes();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <HTMLFlipBook
        showCover={false}
        useMouseEvents
        usePortrait
        showPageCorners
        drawShadow
        mobileScrollSupport
        autoSize
        width={width}
        height={height}
        minWidth={460}
        minHeight={600}
        maxHeight={1533}
        maxWidth={40000}
        maxShadowOpacity={0.5}
        flippingTime={800}
        clickEventForward
        disableFlipByClick={false}
        swipeDistance={100}
        className={styles.html_flip}
        ref={(el) => {
          ref.current = el;
        }}
      >
        {pages}
      </HTMLFlipBook>
    </div>
  );
};

export default BarMenu;

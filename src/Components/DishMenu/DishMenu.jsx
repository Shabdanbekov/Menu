import React, { useEffect, useState } from "react";
import { MenuItem } from "../MenuItem";

import arrowLeft from "../../assets/icons/Arrow_Circle_Left.svg";
import arrowRight from "../../assets/icons/Arrow_Circle_Right.svg";

import styles from "./DishMenu.module.css";
import { getBackgroundColor } from "./utils.js";

const DishMenu = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);
  const [leftPages, setLeftPages] = useState([]);
  const [page, setPage] = useState(0);

  const handleNextPage = () => {
    if (page + 1 === menu.length) return;
    setLeftPages((prev) => [...prev, page]);
    setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (page === 0) return;
    setLeftPages((prev) => {
      const cache = [...prev];
      cache.pop();
      return cache;
    });
    setPage((prev) => prev - 1);
  };

  useEffect(() => {
    const fetchDataMenuDishes = async () => {
      try {
        setLoading(true);
        const dishesResponse = await fetch(
          `http://3.65.63.138:8080/api/menupositions/`
        );
        const categoryResponse = await fetch(
          `http://3.65.63.138:8080/api/menuitems/`
        );
        const dishes = await dishesResponse.json();
        const categories = await categoryResponse.json();

        const categoriesForDish = categories.filter(
          (item) => item.category === 2
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
      {menu.map((item, index) => (
        <MenuItem
          key={index}
          id={item.id}
          zIndex={menu.length - index}
          title={item.title}
          bgImage={getBackgroundColor(index)}
          items={item.dishes}
          isLeft={leftPages.includes(index)}
          isTherePagesOnRight={menu.length - 1 > index}
          isTherePagesOnLeft={index > 0}
        />
      ))}
      {menu.length - 1 > page && (
        <img
          className={styles.btn_next}
          onClick={handleNextPage}
          src={arrowRight}
        />
      )}
      {page > 0 && (
        <img
          className={styles.btn_prev}
          onClick={handlePrevPage}
          src={arrowLeft}
        />
      )}
    </div>
  );
};

export default DishMenu;

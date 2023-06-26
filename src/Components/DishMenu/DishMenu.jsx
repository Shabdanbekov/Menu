import React, { useEffect, useState } from "react";
import {MenuItem} from "../MenuItem";
import bg from '../../assets/backgrounds/salat-bg.png';

import styles from './DishMenu.module.css'

const DishMenu = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  const handleNextPage = () => {
    if (page + 1 >= menu.length) return
    setPage((prev) => prev + 1)
  }

  const handlePrevPage = () => {
    if (page === 0) return
    setPage((prev) => prev - 1)
  }

  useEffect(() => {
    const fetchDataMenuDishes = async () => {
      try {
        setLoading(true)
        const dishesResponse = await fetch(`http://3.65.63.138/api/dish/`);
        const categoryResponse = await fetch(`http://3.65.63.138/api/category/`);
        const dishes = await dishesResponse.json();
        const categories = await categoryResponse.json();

        const categoriesForDish = categories.filter((item) => item.menu === 2);

        const formatDishes = categoriesForDish.map(item => {
          const dishesOfCategory = dishes.filter(dish => dish.category === item.id)

          return {...item, dishes: dishesOfCategory}
        })

        setMenu(formatDishes)
        setLoading(false)
      } catch (e) {
        console.log(e)
        setLoading(false)
      }
    };

    fetchDataMenuDishes();

  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <MenuItem title={menu[page]?.name} bgImage={bg} items={menu[page]?.dishes} />
      <button disabled={page === 0} onClick={handlePrevPage} className={styles.btn_prev}>prev</button>
      <button disabled={page + 1 === menu.length} onClick={handleNextPage} className={styles.btn_next}>next</button>
    </div>
  );
};

export default DishMenu;

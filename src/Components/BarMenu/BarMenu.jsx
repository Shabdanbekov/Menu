import React, { useEffect, useMemo, useState } from "react";
import MenuItem from "../MenuItem";
import { getBackgroundColor, getBottomLineColor } from "../DishMenu/utils";
import styles from "./BarMenu.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BarMenu = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);

  const sortDishesByPrice = (dishes) => {
    return dishes.sort((a, b) => {
      const priceA = parseFloat(a.price.split("/")[0]);
      const priceB = parseFloat(b.price.split("/")[0]);
      return priceA - priceB;
    });
  };

  const pages = useMemo(() => {
    if (!menu.length) return [];
    const result = [];
    let mainIndex = 1;
    let menuIndex = 0;
    const menuItems = Object.assign([], menu);
    while (menuItems.length > 0) {
      const item = menuItems.pop();
      const sortedDishes = sortDishesByPrice(item.dishes);
      result.push(
        <MenuItem
          key={menuIndex}
          id={item.id}
          title={item.title}
          bgImageTitle={getBackgroundColor(mainIndex)}
          lineImage={getBottomLineColor(menuIndex)}
          items={sortedDishes}
          isBar
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
        const [dishesResponse, categoryResponse] = await Promise.all([
          fetch(`https://menu-api.soulist.kg/api/menupositions/`),
          fetch(`https://menu-api.soulist.kg/api/menuitems/`),
        ]);

        const dishes = await dishesResponse.json();
        const categories = await categoryResponse.json();

        const categoriesForDish = categories.filter(
          (item) => item.category === 2
        );

        const formatDishes = categoriesForDish.map((item) => {
          const dishesOfCategory = dishes.filter(
            (dish) => dish.menu_item?.id === item.id
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
    return (
      <div className={styles.loadingContainer}>
        <img src="/logo-soulist.png" alt="" className={styles.logo} />
        <div className={styles.loadingText}></div>
      </div>
    );
  }

  const settings = {
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    focusOnSelect: true,
    autoplay: false,
    lazyLoad: true,
  };

  return (
    <div className={styles.container}>
      <Slider {...settings}>{pages}</Slider>
    </div>
  );
};
export default BarMenu;

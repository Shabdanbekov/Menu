import React, { useEffect, useMemo, useState } from "react";
import MenuItem from "../MenuItem";
import styles from "./WineCard.module.css";
import barTitleBg from "../../assets/backgrounds/bar-title-bg.png";
import Slider from "react-slick";

const WineCard = () => {
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
    // let mainIndex = 1;
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
          bgImageTitle={barTitleBg}
          isBar
          items={sortedDishes}
        />
      );
      menuIndex++;

      // mainIndex++;
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
          (item) => item.category === 3
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
    // autoplay: false,
    lazyLoad: true,
  };

  return (
    <div className={styles.container}>
      <Slider {...settings}>{pages}</Slider>
    </div>
  );
};

export default WineCard;

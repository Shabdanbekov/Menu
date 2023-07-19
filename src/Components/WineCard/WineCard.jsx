import React, { useEffect, useMemo, useState } from "react";
import MenuItem from "../MenuItem";
import styles from "./WineCard.module.css";
import barTitleBg from "../../assets/backgrounds/bar-title-bg.png";
import Slider from "react-slick";

const WineCard = () => {
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
          bgImageTitle={barTitleBg}
          isBar
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
    return <div>Loading...</div>;
  }

  const settings = {
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    focusOnSelect: true,
    autoplay: false,
  };

  return (
    <div className={styles.container}>
      <Slider {...settings}>{pages}</Slider>
    </div>
  );
};

export default WineCard;

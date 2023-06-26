import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import s from "./DishMenu.module.css";

const DishMenu = ({ category }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://3.65.63.138/api/dish/");
        const data = response.data;
        console.log(data);
        setMenuItems(data.filter((el) => el.category === category));
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [category]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={s.container}>
      <div className={s.back}>
        <NavLink to={"/"} className={s.btn}>
          Назад
        </NavLink>
      </div>
      {menuItems.map((item) => (
        <div key={item.id} className={s.descriptions}>
          <NavLink state={item} to={`/dish/${item.id}`} className={s.dishLink}>
            <span>{item.name}</span>
          </NavLink>
          <span className={s.dots}>{".".repeat(30)}</span>
          <span>{item.price} c.</span>
        </div>
      ))}
    </div>
  );
};

export default DishMenu;

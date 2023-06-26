import React, { useEffect, useState } from "react";
import s from "../BarMenu/BarMenu.module.css";
import { NavLink } from "react-router-dom";

const BarMenu = () => {
  const [barItems, setBarItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://3.65.63.138/api/dish/");
        console.log(response);
        const data = await response.json();
        setBarItems(data.filter((el) => el.category === 18));
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

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
      {barItems.map((item) => (
        <div key={item.id} className={s.descriptions}>
          <NavLink state={item} to={`/bar/${item.id}`} className={s.dishLink}>
            <span>{item.name}</span>
          </NavLink>
          <span className={s.dots}>{".".repeat(30)}</span>
          <span>{item.price} c.</span>
        </div>
      ))}
    </div>
  );
};

export default BarMenu;

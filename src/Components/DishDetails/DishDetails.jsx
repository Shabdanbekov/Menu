import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import s from "../DishDetails/DishDetails.module.css";

const DishDetails = () => {
  const [dishData, setDishData] = useState(null);
  const location = useLocation();
  useEffect(() => {
    console.log(location.state);
    setDishData(location.state);
    if (location.state.images) console.log(location.state.images);
  }, []);

  if (!dishData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={s.container}>
      <div className={s.back}>
        <NavLink to={"/FoodMenu/"} className={s.btn}>
          Назад
        </NavLink>
      </div>
      <h1>{dishData.name}</h1>
      <div style={{ display: "flex", color: "#ffe4c4", fontSize: "40px" }}>
        <img
          src={dishData.images[0].image}
          alt={dishData.name}
          className={s.dishImage}
        />

        <p>{dishData.composition}</p>
      </div>
    </div>
  );
};

export default DishDetails;

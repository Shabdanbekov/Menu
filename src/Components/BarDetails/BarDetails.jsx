import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import s from "../BarDetails/BarDetails.module.css";

const BarDetails = () => {
  const [dishData, setDishData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setDishData(location.state);
    if (location.state.images) console.log(location.state.images);
  }, []);

  if (!dishData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={s.container}>
      <div className={s.back}>
        <NavLink to="../BarMenu" className={s.btn}>
          Назад
        </NavLink>
      </div>
      <h1>{dishData.name}</h1>
      <img
        src={dishData.images[0].image}
        alt={dishData.name}
        className={s.dishImage}
      />
      <div className={s.description}></div>
    </div>
  );
};

export default BarDetails;

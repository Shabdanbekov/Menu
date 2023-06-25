import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import s from "../BarDetails/BarDetails.module.css";

const BarDetails = () => {
  const [barData, setBarData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setBarData(location.state);
    if (location.state.images) console.log(location.state.images);
  }, []);

  if (!barData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={s.container}>
      <div className={s.back}>
        <button onClick={() => navigate(-1)} className={s.btn}>
          Назад
        </button>
      </div>
      <h1>{barData.name}</h1>
      <div className={s.composition}>
        <img
          src={barData.images[0].image}
          alt={barData.name}
          className={s.dishImage}
        />
        <p>{barData.composition}</p>
      </div>
    </div>
  );
};

export default BarDetails;

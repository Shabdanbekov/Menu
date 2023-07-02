import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from "../BarDetails/BarDetails.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const BarDetails = () => {
  const [dishData, setDishData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(location.state);
    setDishData(location.state);
    if (location.state.images) console.log(location.state.images);
  }, []);

  if (!dishData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.container}>
      <FontAwesomeIcon
        icon={faArrowLeft}
        onClick={() => navigate(-1)}
        className={style.icon}
      />
      <h1>{dishData.name}</h1>
      <div className={style.composition}>
        <img src={dishData.picture} alt="" className={style.dishImage} />
        <span>{dishData.weight} г.</span>
        <span>{dishData.price} c.</span>
      </div>
    </div>
  );
};

export default BarDetails;

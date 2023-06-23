// import React, { useEffect, useState } from "react";
// import s from "../FoodMenu/FoodMenu.module.css";

// const AboutDish = () => {
//   const [dishItems, setDishItems] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://3.65.63.138/api/");
//         const data = await response.json();
//         setDishItems(data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className={s.container}>
//       {dishItems.map((dish) => (
//         <div key={dish.id} className={s.descriptions}>
//           <img src={dish.image} alt="" />
//           <span>{dish.name}</span>
//           <span>{dish.price} c.</span>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AboutDish;

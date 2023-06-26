import { NavLink } from "react-router-dom";
import s from "./DishMenu.module.css";

const DishMenu = ({ menuItems }) => {
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

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

// import React, { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
// import s from "./DishMenu.module.css";

// const DishMenu = () => {
//   const [menuItems, setMenuItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://3.65.63.138/api/dish/");
//         const data = await response.json();
//         console.log(data);
//         setMenuItems(data);
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   // Group menu items by category
//   const groupedMenuItems = menuItems.reduce((result, item) => {
//     const category = item.category;
//     if (!result[category]) {
//       result[category] = [];
//     }
//     result[category].push(item);
//     return result;
//   }, {});

//   return (
//     <div className={s.container}>
//       <div className={s.back}>
//         <NavLink to={"/"} className={s.btn}>
//           Назад
//         </NavLink>
//       </div>
//       {Object.entries(groupedMenuItems).map(([category, items]) => (
//         <div key={category} className={s.categoryContainer}>
//           <h2>Category {category}</h2>
//           <div className={s.menuItems}>
//             {items.map((item) => (
//               <div key={item.id} className={s.descriptions}>
//                 <NavLink
//                   state={item}
//                   to={`/dish/${item.id}`}
//                   className={s.dishLink}
//                 >
//                   <span>{item.name}</span>
//                 </NavLink>
//                 <span className={s.dots}>{".".repeat(30)}</span>
//                 <span>{item.price} c.</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DishMenu;

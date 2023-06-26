import React from "react";
import React, { useEffect, useState } from "react";
import DishMenu from "../../Components/DishMenu/DishMenu";

const index = () => {
  const [menuItems, setMenuItems] = useState([]);
  //   const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://3.65.63.138/api/dish/`);
        const data = await response.json();
        console.log(data);
        setMenuItems(data.filter((el) => el.category === 9));
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <DishMenu menuItems={menuItems} />
    </div>
  );
};

export default index;

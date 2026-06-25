// import React, { useEffect, useMemo, useState } from "react";
// import MenuItem from "../MenuItem";

// import styles from "./DishMenu.module.css";
// import { getBackgroundColor, getBottomLineColor } from "./utils.js";
// import Slider from "react-slick";

// const DishMenu = () => {
//   const [menu, setMenu] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const sortDishesByPrice = (dishes) => {
//     return dishes.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
//   };

//   const pages = useMemo(() => {
//     if (!menu.length) return [];
//     const result = [];
//     // let mainIndex = 1;
//     let menuIndex = 0;
//     const menuItems = Object.assign([], menu);

//     while (menuItems.length > 0) {
//       const item = menuItems.pop();
//       const sortedDishes = sortDishesByPrice(item.dishes);
//       result.push(
//         <MenuItem
//           key={menuIndex}
//           id={item.id}
//           title={item.title}
//           bgImageTitle={getBackgroundColor(menuIndex)}
//           lineImage={getBottomLineColor(menuIndex)}
//           items={sortedDishes}
//         />
//       );
//       menuIndex++;

//       // mainIndex++;
//     }
//     return result;
//   }, [menu]);

//   useEffect(() => {
//     const fetchDataMenuDishes = async () => {
//       try {
//         setLoading(true);
//         const [dishesResponse, categoryResponse] = await Promise.all([
//           fetch(`https://menu-api.soulist.kg/api/menupositions/`),
//           fetch(`https://menu-api.soulist.kg/api/menuitems/`),
//         ]);

//         const dishes = await dishesResponse.json();
//         const categories = await categoryResponse.json();

//         const categoriesForDish = categories.filter(
//           (item) => item.category === 1
//         );

//         const formatDishes = categoriesForDish.map((item) => {
//           const dishesOfCategory = dishes.filter(
//             (dish) => dish.menu_item?.id === item.id
//           );

//           return { ...item, dishes: dishesOfCategory };
//         });

//         setMenu(formatDishes);
//         setLoading(false);
//       } catch (e) {
//         console.log(e);
//         setLoading(false);
//       }
//     };

//     fetchDataMenuDishes();
//   }, []);

//   if (loading) {
//     return (
//       <div className={styles.loadingContainer}>
//         <img src="/logo-soulist.png" alt="" className={styles.logo} />
//         <div className={styles.loadingText}></div>
//       </div>
//     );
//   }

//   const settings = {
//     infinite: false,
//     speed: 300,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     focusOnSelect: true,
//     autoplay: false,
//     lazyLoad: true,
//   };
//   return (
//     <div className={styles.container}>
//       <Slider {...settings}>{pages}</Slider>
//     </div>
//   );
// };

// export default DishMenu;



// import React, { useEffect, useMemo, useState } from "react";
// import MenuItem from "../MenuItem";

// import styles from "./DishMenu.module.css";
// import { getBackgroundColor, getBottomLineColor } from "./utils.js";
// import Slider from "react-slick";

// const DishMenu = () => {
//   const [menu, setMenu] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const sortDishesByPrice = (dishes) => {
//     return dishes.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
//   };

//   const sortDataByIds = (data, ids) => {
//     data.sort((a, b) => {
//       if (ids.includes(a.id)) return -1; // a comes first
//       if (ids.includes(b.id)) return 1; // b comes first
//       return 0; // Leave other elements unchanged
//     });
//   };

//   const pages = useMemo(() => {
//     if (!menu.length) return [];
//     const result = [];
//     let menuIndex = 0;
//     const menuItems = Object.assign([], menu);

//     while (menuItems.length > 0) {
//       const item = menuItems.pop();
//       const sortedDishes = sortDishesByPrice(item.dishes);
//       result.push(
//         <MenuItem
//           key={menuIndex}
//           id={item.id}
//           title={item.title}
//           bgImageTitle={getBackgroundColor(menuIndex)}
//           lineImage={getBottomLineColor(menuIndex)}
//           items={sortedDishes}
//         />
//       );
//       menuIndex++;
//     }
//     return result;
//   }, [menu]);

//   useEffect(() => {
//     const fetchDataMenuDishes = async () => {
//       try {
//         setLoading(true);
//         const [dishesResponse, categoryResponse] = await Promise.all([
//           fetch(`https://menu-api.soulist.kg/api/menupositions/`),
//           fetch(`https://menu-api.soulist.kg/api/menuitems/`),
//         ]);

//         const dishes = await dishesResponse.json();
//         const categories = await categoryResponse.json();

//         const categoriesForDish = categories.filter(
//           (item) => item.category === 1
//         );

//         const formatDishes = categoriesForDish.map((item) => {
//           const dishesOfCategory = dishes.filter(
//             (dish) => dish.menu_item?.id === item.id
//           );

//           return { ...item, dishes: dishesOfCategory };
//         });

//         const targetIds = [18, 19];
//         sortDataByIds(formatDishes, targetIds);

//         setMenu(formatDishes);
//         setLoading(false);
//       } catch (e) {
//         console.log(e);
//         setLoading(false);
//       }
//     };

//     fetchDataMenuDishes();
//   }, []);

//   if (loading) {
//     return (
//       <div className={styles.loadingContainer}>
//         <img src="/logo-soulist.png" alt="" className={styles.logo} />
//         <div className={styles.loadingText}></div>
//       </div>
//     );
//   }

//   const settings = {
//     infinite: false,
//     speed: 300,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     focusOnSelect: true,
//     autoplay: false,
//     lazyLoad: true,
//   };
//   return (
//     <div className={styles.container}>
//       <Slider {...settings}>{pages}</Slider>
//     </div>
//   );
// };

// export default DishMenu;


import React, { useEffect, useMemo, useState } from "react";
import MenuItem from "../MenuItem";
import styles from "./DishMenu.module.css";
import { getBackgroundColor, getBottomLineColor } from "./utils.js";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Моковые данные для теста кухни
const MOCK_DISHES = [
  // Супы (id категории: 1)
  { id: 1, name: "Борщ с пампушками", price: "320", menu_item: { id: 1 } },
  { id: 2, name: "Солянка мясная", price: "380", menu_item: { id: 1 } },
  { id: 3, name: "Крем-суп грибной", price: "290", menu_item: { id: 1 } },
  { id: 21, name: "Уха царская", price: "450", menu_item: { id: 1 } },
  { id: 22, name: "Суп-лапша куриная", price: "280", menu_item: { id: 1 } },
  { id: 23, name: "Том ям с креветками", price: "520", menu_item: { id: 1 } },
  { id: 24, name: "Гаспачо", price: "340", menu_item: { id: 1 } },
  { id: 25, name: "Харчо", price: "360", menu_item: { id: 1 } },
  
  // Салаты (id категории: 2)
  { id: 4, name: "Цезарь с курицей", price: "420", menu_item: { id: 2 } },
  { id: 5, name: "Греческий салат", price: "380", menu_item: { id: 2 } },
  { id: 6, name: "Сельдь под шубой", price: "340", menu_item: { id: 2 } },
  { id: 27, name: "Оливье", price: "320", menu_item: { id: 2 } },
  { id: 28, name: "Винегрет", price: "260", menu_item: { id: 2 } },
  { id: 29, name: "Теплый салат с говядиной", price: "480", menu_item: { id: 2 } },
  { id: 30, name: "Нисуаз с тунцом", price: "520", menu_item: { id: 2 } },
  { id: 31, name: "Капрезе", price: "390", menu_item: { id: 2 } },
  { id: 32, name: "Салат с креветками и грейпфрутом", price: "550", menu_item: { id: 2 } },
  { id: 33, name: "Мимоза", price: "300", menu_item: { id: 2 } },
  
  // Горячие блюда (id категории: 3)
  { id: 7, name: "Плов узбекский", price: "450", menu_item: { id: 3 } },
  { id: 8, name: "Курица табака", price: "520", menu_item: { id: 3 } },
  { id: 9, name: "Стейк из говядины", price: "890", menu_item: { id: 3 } },
  { id: 10, name: "Котлеты по-киевски", price: "480", menu_item: { id: 3 } },
  { id: 35, name: "Люля-кебаб", price: "420", menu_item: { id: 3 } },
  { id: 36, name: "Жаркое по-домашнему", price: "380", menu_item: { id: 3 } },
  { id: 37, name: "Рыба в кляре", price: "540", menu_item: { id: 3 } },
  { id: 38, name: "Утка по-пекински", price: "1200", menu_item: { id: 3 } },
  { id: 39, name: "Лосось на гриле", price: "780", menu_item: { id: 3 } },
  { id: 41, name: "Бефстроганов", price: "560", menu_item: { id: 3 } },
  { id: 42, name: "Голубцы", price: "390", menu_item: { id: 3 } },
  
  // Гарниры (id категории: 4)
  { id: 11, name: "Картофель фри", price: "220", menu_item: { id: 4 } },
  { id: 12, name: "Рис отварной", price: "180", menu_item: { id: 4 } },
  { id: 13, name: "Овощи гриль", price: "280", menu_item: { id: 4 } },
  { id: 43, name: "Картофельное пюре", price: "190", menu_item: { id: 4 } },
  { id: 44, name: "Гречка с грибами", price: "230", menu_item: { id: 4 } },
  { id: 45, name: "Паста карбонара", price: "350", menu_item: { id: 4 } },
  { id: 46, name: "Овощи на пару", price: "210", menu_item: { id: 4 } },
  { id: 47, name: "Картофель по-деревенски", price: "240", menu_item: { id: 4 } },
  { id: 48, name: "Кускус с овощами", price: "260", menu_item: { id: 4 } },
  
  // Десерты (id категории: 5)
  { id: 14, name: "Тирамису", price: "390", menu_item: { id: 5 } },
  { id: 15, name: "Чизкейк", price: "350", menu_item: { id: 5 } },
  { id: 16, name: "Мороженое", price: "180", menu_item: { id: 5 } },
  { id: 49, name: "Наполеон", price: "320", menu_item: { id: 5 } },
  { id: 50, name: "Панна-котта", price: "290", menu_item: { id: 5 } },
  { id: 51, name: "Шоколадный фондан", price: "380", menu_item: { id: 5 } },
  { id: 52, name: "Чизкейк Нью-Йорк", price: "370", menu_item: { id: 5 } },
  { id: 53, name: "Медовик", price: "310", menu_item: { id: 5 } },
  { id: 54, name: "Птичье молоко", price: "280", menu_item: { id: 5 } },
  { id: 55, name: "Брауни с мороженым", price: "350", menu_item: { id: 5 } },
  { id: 56, name: "Сорбет лимонный", price: "220", menu_item: { id: 5 } },
  
  // Закуски (новая категория id: 6)
  { id: 57, name: "Брускетты с лососем", price: "380", menu_item: { id: 6 } },
  { id: 58, name: "Сырная тарелка", price: "650", menu_item: { id: 6 } },
  { id: 59, name: "Мясное ассорти", price: "720", menu_item: { id: 6 } },
  { id: 60, name: "Оливки/маслины", price: "190", menu_item: { id: 6 } },
  { id: 61, name: "Чесночные гренки", price: "160", menu_item: { id: 6 } },
  { id: 62, name: "Креветки в темпуре", price: "490", menu_item: { id: 6 } },
  { id: 63, name: "Карпаччо из говядины", price: "540", menu_item: { id: 6 } },
  
  // Специальные блюда для сортировки (id 18 и 19)
  { id: 17, name: "Фирменное блюдо повара", price: "750", menu_item: { id: 18 } },
  { id: 18, name: "Дегустационный сет", price: "1200", menu_item: { id: 18 } },
  { id: 64, name: "Шеф-рекомендация", price: "890", menu_item: { id: 18 } },
  { id: 65, name: "Авторское блюдо", price: "950", menu_item: { id: 18 } },
  { id: 19, name: "Сезонное блюдо", price: "580", menu_item: { id: 19 } },
  { id: 20, name: "Хит сезона", price: "690", menu_item: { id: 19 } },
  { id: 66, name: "Новинка осени", price: "530", menu_item: { id: 19 } },
  { id: 67, name: "Праздничное предложение", price: "820", menu_item: { id: 19 } },
];

const MOCK_CATEGORIES = [
  { id: 1, title: "Супы", category: 1 },
  { id: 2, title: "Салаты", category: 1 },
  { id: 3, title: "Горячие блюда", category: 1 },
  { id: 4, title: "Гарниры", category: 1 },
  { id: 5, title: "Десерты", category: 1 },
  { id: 6, title: "Закуски", category: 1 }, // Добавлена новая категория
  { id: 18, title: "Фирменные блюда", category: 1 }, // Специальная категория
  { id: 19, title: "Сезонное меню", category: 1 },    // Специальная категория
];

const DishMenu = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);

  const sortDishesByPrice = (dishes) => {
    return [...dishes].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  };

  const sortDataByIds = (data, ids) => {
    return [...data].sort((a, b) => {
      if (ids.includes(a.id) && !ids.includes(b.id)) return -1;
      if (!ids.includes(a.id) && ids.includes(b.id)) return 1;
      return 0;
    });
  };

  const pages = useMemo(() => {
    if (!menu.length) return [];
    
    return menu.map((item, index) => {
      const sortedDishes = sortDishesByPrice(item.dishes);
      return (
        <MenuItem
          key={item.id}
          id={item.id}
          title={item.title}
          bgImageTitle={getBackgroundColor(index)}
          lineImage={getBottomLineColor(index)}
          items={sortedDishes}
        />
      );
    });
  }, [menu]);

  useEffect(() => {
    // Симуляция загрузки данных
    setLoading(true);
    
    // Имитация асинхронного запроса
    setTimeout(() => {
      try {
        // Фильтруем категории для кухни (category === 1)
        const categoriesForDish = MOCK_CATEGORIES.filter(
          (item) => item.category === 1
        );

        // Форматируем данные: добавляем блюда к каждой категории
        let formatDishes = categoriesForDish.map((item) => {
          const dishesOfCategory = MOCK_DISHES.filter(
            (dish) => dish.menu_item?.id === item.id
          );
          return { ...item, dishes: dishesOfCategory };
        });

        // Фильтруем категории без блюд
        formatDishes = formatDishes.filter(item => item.dishes.length > 0);

        // Сортируем: категории с id 18 и 19 будут первыми
        const targetIds = [18, 19];
        formatDishes = sortDataByIds(formatDishes, targetIds);

        setMenu(formatDishes);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    }, 1000); // Имитация задержки сети
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <img src="/logo-soulist.png" alt="" className={styles.logo} />
        <div className={styles.loadingText}>Загрузка ...</div>
      </div>
    );
  }

  const settings = {
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    focusOnSelect: true,
    autoplay: false,
    lazyLoad: true,
    arrows: true,
    dots: true,
  };

  return (
    <div className={styles.container}>
      {pages.length > 0 ? (
        <Slider {...settings}>{pages}</Slider>
      ) : (
        <div className={styles.emptyMenu}>Меню временно недоступно</div>
      )}
    </div>
  );
};

export default DishMenu;
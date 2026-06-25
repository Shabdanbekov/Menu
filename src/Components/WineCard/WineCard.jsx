// import React, { useEffect, useMemo, useState } from "react";
// import MenuItem from "../MenuItem";
// import styles from "./WineCard.module.css";
// import barTitleBg from "../../assets/backgrounds/bar-title-bg.png";
// import Slider from "react-slick";

// const WineCard = () => {
//   const [menu, setMenu] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const sortDishesByPrice = (dishes) => {
//     return dishes.sort((a, b) => {
//       const priceA = parseFloat(a.price.split("/")[0]);
//       const priceB = parseFloat(b.price.split("/")[0]);
//       return priceA - priceB;
//     });
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
//           bgImageTitle={barTitleBg}
//           isBar
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
//           (item) => item.category === 3
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
//     // autoplay: false,
//     lazyLoad: true,
//   };

//   return (
//     <div className={styles.container}>
//       <Slider {...settings}>{pages}</Slider>
//     </div>
//   );
// };

// export default WineCard;


import React, { useEffect, useMemo, useState } from "react";
import MenuItem from "../MenuItem";
import styles from "./WineCard.module.css";
import barTitleBg from "../../assets/backgrounds/bar-title-bg.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Моковые данные для винной карты (category === 3)
const MOCK_WINES = [
  // Красные вина (id категории: 1)
  { id: 1, name: "Château Margaux 2015", price: "4500/бокал", menu_item: { id: 1 } },
  { id: 2, name: "Opus One 2018", price: "5200/бокал", menu_item: { id: 1 } },
  { id: 3, name: "Sassicaia 2017", price: "4800/бокал", menu_item: { id: 1 } },
  { id: 4, name: "Каберне Совиньон Reserva", price: "2800/бокал", menu_item: { id: 1 } },
  { id: 5, name: "Мерлот Классик", price: "2200/бокал", menu_item: { id: 1 } },
  { id: 6, name: "Шираз Барossa Valley", price: "3500/бокал", menu_item: { id: 1 } },
  { id: 7, name: "Пино Нуар Бургундия", price: "3900/бокал", menu_item: { id: 1 } },
  { id: 8, name: "Мальбек Аргентина", price: "2700/бокал", menu_item: { id: 1 } },
  
  // Белые вина (id категории: 2)
  { id: 9, name: "Chablis Grand Cru", price: "3800/бокал", menu_item: { id: 2 } },
  { id: 10, name: "Sancerre Loire", price: "3200/бокал", menu_item: { id: 2 } },
  { id: 11, name: "Рислинг Eiswein", price: "4200/бокал", menu_item: { id: 2 } },
  { id: 12, name: "Шардоне Калифорния", price: "2900/бокал", menu_item: { id: 2 } },
  { id: 13, name: "Совиньон Блан НЗ", price: "2600/бокал", menu_item: { id: 2 } },
  { id: 14, name: "Пино Гриджио", price: "2400/бокал", menu_item: { id: 2 } },
  { id: 15, name: "Верментино Сардиния", price: "2800/бокал", menu_item: { id: 2 } },
  { id: 16, name: "Торронтес Аргентина", price: "2300/бокал", menu_item: { id: 2 } },
  
  // Игристые вина (id категории: 3)
  { id: 17, name: "Dom Pérignon 2012", price: "12000/бокал", menu_item: { id: 3 } },
  { id: 18, name: "Krug Grande Cuvée", price: "9800/бокал", menu_item: { id: 3 } },
  { id: 19, name: "Veuve Clicquot", price: "4500/бокал", menu_item: { id: 3 } },
  { id: 20, name: "Moët & Chandon", price: "4200/бокал", menu_item: { id: 3 } },
  { id: 21, name: "Prosecco Superiore", price: "2800/бокал", menu_item: { id: 3 } },
  { id: 22, name: "Cava Reserva", price: "2400/бокал", menu_item: { id: 3 } },
  { id: 23, name: "Franciacorta", price: "3500/бокал", menu_item: { id: 3 } },
  { id: 24, name: "Crémant de Loire", price: "2900/бокал", menu_item: { id: 3 } },
  
  // Розовые вина (id категории: 4)
  { id: 25, name: "Whispering Angel", price: "3200/бокал", menu_item: { id: 4 } },
  { id: 26, name: "Miraval Côtes de Provence", price: "3500/бокал", menu_item: { id: 4 } },
  { id: 27, name: "Garrus Rosé", price: "5800/бокал", menu_item: { id: 4 } },
  { id: 28, name: "Rosé d'Anjou", price: "2100/бокал", menu_item: { id: 4 } },
  { id: 29, name: "Zinfandel Rosé", price: "2500/бокал", menu_item: { id: 4 } },
  { id: 30, name: "Syrah Rosé", price: "2700/бокал", menu_item: { id: 4 } },
  
  // Десертные вина (id категории: 5)
  { id: 31, name: "Château d'Yquem", price: "15000/бокал", menu_item: { id: 5 } },
  { id: 32, name: "Tokaji Aszú 5 Puttonyos", price: "6800/бокал", menu_item: { id: 5 } },
  { id: 33, name: "Porto Vintage 2011", price: "4500/бокал", menu_item: { id: 5 } },
  { id: 34, name: "Sauternes Grand Cru", price: "5200/бокал", menu_item: { id: 5 } },
  { id: 35, name: "Ice Wine Riesling", price: "5900/бокал", menu_item: { id: 5 } },
  { id: 36, name: "Madeira Malmsey", price: "3800/бокал", menu_item: { id: 5 } },
  
  // Вина по бутылкам (id категории: 6)
  { id: 37, name: "Château Lafite Rothschild", price: "85000/бутылка", menu_item: { id: 6 } },
  { id: 38, name: "Petrus Pomerol", price: "120000/бутылка", menu_item: { id: 6 } },
  { id: 39, name: "Gaja Barbaresco", price: "45000/бутылка", menu_item: { id: 6 } },
  { id: 40, name: "Vega Sicilia Único", price: "68000/бутылка", menu_item: { id: 6 } },
  { id: 41, name: "Solaia Antinori", price: "52000/бутылка", menu_item: { id: 6 } },
  { id: 42, name: "Almaviva", price: "38000/бутылка", menu_item: { id: 6 } },
  { id: 43, name: "Caymus Cabernet", price: "29000/бутылка", menu_item: { id: 6 } },
  { id: 44, name: "Cloudy Bay Sauvignon", price: "18000/бутылка", menu_item: { id: 6 } },
  
  // Вина из разных стран (id категории: 7)
  { id: 45, name: "Франция: Châteauneuf-du-Pape", price: "4200/бокал", menu_item: { id: 7 } },
  { id: 46, name: "Италия: Barolo Riserva", price: "4800/бокал", menu_item: { id: 7 } },
  { id: 47, name: "Испания: Rioja Gran Reserva", price: "3600/бокал", menu_item: { id: 7 } },
  { id: 48, name: "Чили: Don Melchor", price: "3400/бокал", menu_item: { id: 7 } },
  { id: 49, name: "Австралия: Penfolds Grange", price: "22000/бокал", menu_item: { id: 7 } },
  { id: 50, name: "США: Opus One", price: "18000/бокал", menu_item: { id: 7 } },
  { id: 51, name: "ЮАР: Kanonkop", price: "2800/бокал", menu_item: { id: 7 } },
  { id: 52, name: "Новая Зеландия: Cloudy Bay", price: "3200/бокал", menu_item: { id: 7 } },
  
  // Винные сеты и дегустации (id категории: 8)
  { id: 53, name: "Дегустационный сет красных вин", price: "3500/сет", menu_item: { id: 8 } },
  { id: 54, name: "Дегустационный сет белых вин", price: "3200/сет", menu_item: { id: 8 } },
  { id: 55, name: "Винный сет 'Вокруг света'", price: "5500/сет", menu_item: { id: 8 } },
  { id: 56, name: "Премиум дегустация", price: "8900/сет", menu_item: { id: 8 } },
  { id: 57, name: "Сет игристых вин", price: "4200/сет", menu_item: { id: 8 } },
];

const MOCK_CATEGORIES = [
  { id: 1, title: "Красные вина", category: 3 },
  { id: 2, title: "Белые вина", category: 3 },
  { id: 3, title: "Игристые вина", category: 3 },
  { id: 4, title: "Розовые вина", category: 3 },
  { id: 5, title: "Десертные вина", category: 3 },
  { id: 6, title: "Вина по бутылкам", category: 3 },
  { id: 7, title: "Вина разных стран", category: 3 },
  { id: 8, title: "Винные сеты", category: 3 },
];

const WineCard = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);

  const sortDishesByPrice = (dishes) => {
    return [...dishes].sort((a, b) => {
      const priceA = parseFloat(a.price.split("/")[0]);
      const priceB = parseFloat(b.price.split("/")[0]);
      return priceA - priceB;
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
          bgImageTitle={barTitleBg}
          isBar
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
        // Фильтруем категории для винной карты (category === 3)
        const categoriesForWine = MOCK_CATEGORIES.filter(
          (item) => item.category === 3
        );

        // Форматируем данные: добавляем вина к каждой категории
        const formatWines = categoriesForWine.map((item) => {
          const winesOfCategory = MOCK_WINES.filter(
            (wine) => wine.menu_item?.id === item.id
          );
          return { ...item, dishes: winesOfCategory };
        });

        // Фильтруем категории без вин
        const filteredWines = formatWines.filter(item => item.dishes.length > 0);

        setMenu(filteredWines);
        setLoading(false);
      } catch (e) {
        console.log("Ошибка загрузки винной карты:", e);
        setLoading(false);
      }
    }, 1000); // Имитация задержки сети
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <img src="/logo-soulist.png" alt="Логотип" className={styles.logo} />
        <div className={styles.loadingText}>Загрузка винной карты...</div>
      </div>
    );
  }

  const settings = {
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    focusOnSelect: true,
    lazyLoad: true,
    arrows: true,
    dots: true,
  };

  return (
    <div className={styles.container}>
      {pages.length > 0 ? (
        <Slider {...settings}>{pages}</Slider>
      ) : (
        <div className={styles.emptyMenu}>Винная карта временно недоступна</div>
      )}
    </div>
  );
};

export default WineCard;
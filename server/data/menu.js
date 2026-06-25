const sections = [
  {
    id: "food",
    slug: "dish-menu",
    title: "Кухня",
    eyebrow: "Chef selection",
    description: "Авторские блюда, горячие позиции, салаты и десерты.",
    accent: "#ff7a59",
    heroImage:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1600&q=80",
    categories: [
      {
        id: "signature",
        title: "Фирменное",
        items: [
          {
            id: "food-01",
            name: "Стейк Soulist с перечным соусом",
            description: "Говяжья вырезка, перечный соус, молодой картофель.",
            price: 1290,
            weight: "320 г",
            badges: ["hit", "meat"],
            image:
              "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80",
            pair: "Cabernet Sauvignon",
          },
          {
            id: "food-02",
            name: "Лосось на гриле",
            description: "Филе лосося, цитрусовое масло, зелёная спаржа.",
            price: 1180,
            weight: "280 г",
            badges: ["fish", "light"],
            image:
              "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80",
            pair: "Sauvignon Blanc",
          },
          {
            id: "food-03",
            name: "Дегустационный сет шефа",
            description: "Пять сезонных мини-блюд с авторской подачей.",
            price: 1850,
            weight: "сет",
            badges: ["new", "hit"],
            image:
              "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
            pair: "Игристое brut",
          },
        ],
      },
      {
        id: "salads",
        title: "Салаты",
        items: [
          {
            id: "food-04",
            name: "Цезарь с курицей sous-vide",
            description: "Романо, пармезан, соус цезарь, хрустящая чиабатта.",
            price: 520,
            weight: "240 г",
            badges: ["classic"],
            image:
              "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=900&q=80",
            pair: "Белое сухое",
          },
          {
            id: "food-05",
            name: "Тёплый салат с говядиной",
            description: "Ростбиф, овощи гриль, соус понзу, кунжут.",
            price: 680,
            weight: "260 г",
            badges: ["meat"],
            image:
              "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80",
            pair: "Pinot Noir",
          },
          {
            id: "food-06",
            name: "Буррата с томатами",
            description: "Буррата, розовые томаты, базилик, оливковое масло.",
            price: 760,
            weight: "250 г",
            badges: ["vegetarian"],
            image:
              "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80",
            pair: "Rosé Provence",
          },
        ],
      },
      {
        id: "hot",
        title: "Горячее",
        items: [
          {
            id: "food-07",
            name: "Паста с трюфельным кремом",
            description: "Феттучине, грибы, трюфельное масло, пармезан.",
            price: 690,
            weight: "310 г",
            badges: ["vegetarian"],
            image:
              "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80",
            pair: "Chardonnay",
          },
          {
            id: "food-08",
            name: "Том ям с креветками",
            description: "Кокосовое молоко, креветки, лемонграсс, лайм.",
            price: 640,
            weight: "420 мл",
            badges: ["spicy", "fish"],
            image:
              "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=80",
            pair: "Riesling",
          },
          {
            id: "food-09",
            name: "Плов праздничный",
            description: "Рис лазер, говядина, морковь, нут, изюм.",
            price: 590,
            weight: "380 г",
            badges: ["classic"],
            image:
              "https://images.unsplash.com/photo-1649868144896-1f0f981d34c3?auto=format&fit=crop&w=900&q=80",
            pair: "Чёрный чай",
          },
        ],
      },
      {
        id: "desserts",
        title: "Десерты",
        items: [
          {
            id: "food-10",
            name: "Шоколадный фондан",
            description: "Тёплый шоколадный центр, ванильное мороженое.",
            price: 430,
            weight: "180 г",
            badges: ["hit"],
            image:
              "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80",
            pair: "Porto Ruby",
          },
          {
            id: "food-11",
            name: "Чизкейк с ягодным кули",
            description: "Крем-сыр, песочная основа, малина и смородина.",
            price: 390,
            weight: "170 г",
            badges: ["classic"],
            image:
              "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=80",
            pair: "Капучино",
          },
        ],
      },
    ],
  },
  {
    id: "bar",
    slug: "bar-menu",
    title: "Бар",
    eyebrow: "Mixology bar",
    description: "Коктейли, лимонады, крепкий алкоголь и вечерние сеты.",
    accent: "#2ec4b6",
    heroImage:
      "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=1600&q=80",
    categories: [
      {
        id: "cocktails",
        title: "Коктейли",
        items: [
          {
            id: "bar-01",
            name: "Smoky Negroni",
            description: "Джин, кампари, вермут, лёгкое дымное облако.",
            price: 620,
            weight: "120 мл",
            badges: ["hit", "strong"],
            image:
              "https://images.unsplash.com/photo-1575023782549-62ca0d244b39?auto=format&fit=crop&w=900&q=80",
            pair: "Стейк Soulist",
          },
          {
            id: "bar-02",
            name: "Mango Sour",
            description: "Бурбон, манго, лимон, белок, ангостура.",
            price: 590,
            weight: "150 мл",
            badges: ["new"],
            image:
              "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=80",
            pair: "Том ям",
          },
          {
            id: "bar-03",
            name: "Basil Spritz",
            description: "Игристое, базилик, цитрус, содовая.",
            price: 540,
            weight: "180 мл",
            badges: ["light"],
            image:
              "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80",
            pair: "Буррата",
          },
        ],
      },
      {
        id: "nonalcohol",
        title: "Без алкоголя",
        items: [
          {
            id: "bar-04",
            name: "Домашний лимонад маракуйя",
            description: "Маракуйя, лайм, мята, содовая.",
            price: 320,
            weight: "350 мл",
            badges: ["fresh"],
            image:
              "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=900&q=80",
            pair: "Паста",
          },
          {
            id: "bar-05",
            name: "Матча-тоник",
            description: "Церемониальная матча, тоник, жасмин.",
            price: 360,
            weight: "300 мл",
            badges: ["new"],
            image:
              "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&q=80",
            pair: "Десерты",
          },
        ],
      },
      {
        id: "spirits",
        title: "Крепкое",
        items: [
          {
            id: "bar-06",
            name: "Glenmorangie Original",
            description: "Шотландский односолодовый виски, мягкий цитрус.",
            price: 680,
            weight: "50 мл",
            badges: ["strong"],
            image:
              "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=900&q=80",
            pair: "Шоколадный фондан",
          },
          {
            id: "bar-07",
            name: "Patrón Silver",
            description: "Текила из голубой агавы, чистый минеральный вкус.",
            price: 720,
            weight: "50 мл",
            badges: ["strong"],
            image:
              "https://images.unsplash.com/photo-1608885898957-a3f0442b0449?auto=format&fit=crop&w=900&q=80",
            pair: "Салат с говядиной",
          },
        ],
      },
    ],
  },
  {
    id: "wine",
    slug: "wine-card",
    title: "Винная карта",
    eyebrow: "Sommelier picks",
    description: "Вина по бокалам, бутылкам и дегустационные подборки.",
    accent: "#b84a62",
    heroImage:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1600&q=80",
    categories: [
      {
        id: "red",
        title: "Красные",
        items: [
          {
            id: "wine-01",
            name: "Malbec Reserva",
            description: "Аргентина, спелая вишня, какао, бархатные танины.",
            price: 690,
            weight: "150 мл",
            badges: ["glass"],
            image:
              "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=900&q=80",
            pair: "Стейк Soulist",
          },
          {
            id: "wine-02",
            name: "Pinot Noir Bourgogne",
            description: "Франция, красные ягоды, земляника, лёгкое тело.",
            price: 820,
            weight: "150 мл",
            badges: ["glass", "light"],
            image:
              "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?auto=format&fit=crop&w=900&q=80",
            pair: "Лосось",
          },
        ],
      },
      {
        id: "white",
        title: "Белые",
        items: [
          {
            id: "wine-03",
            name: "Sauvignon Blanc Marlborough",
            description: "Новая Зеландия, крыжовник, лайм, хрустящая кислотность.",
            price: 620,
            weight: "150 мл",
            badges: ["glass", "fresh"],
            image:
              "https://images.unsplash.com/photo-1568213816046-0ee1c42bd559?auto=format&fit=crop&w=900&q=80",
            pair: "Буррата",
          },
          {
            id: "wine-04",
            name: "Chardonnay Reserve",
            description: "Калифорния, ваниль, сливочное яблоко, дуб.",
            price: 760,
            weight: "150 мл",
            badges: ["glass"],
            image:
              "https://images.unsplash.com/photo-1560148218-1a83060f7b32?auto=format&fit=crop&w=900&q=80",
            pair: "Паста",
          },
        ],
      },
      {
        id: "sparkling",
        title: "Игристые",
        items: [
          {
            id: "wine-05",
            name: "Crémant de Loire Brut",
            description: "Франция, зелёное яблоко, бриошь, тонкий перляж.",
            price: 780,
            weight: "150 мл",
            badges: ["glass", "hit"],
            image:
              "https://images.unsplash.com/photo-1601051390185-8bf6f0fdf76b?auto=format&fit=crop&w=900&q=80",
            pair: "Дегустационный сет",
          },
          {
            id: "wine-06",
            name: "Prosecco Superiore",
            description: "Италия, груша, белые цветы, лёгкий сладкий тон.",
            price: 560,
            weight: "150 мл",
            badges: ["glass", "light"],
            image:
              "https://images.unsplash.com/photo-1547595628-c61a29f496f0?auto=format&fit=crop&w=900&q=80",
            pair: "Чизкейк",
          },
        ],
      },
      {
        id: "bottles",
        title: "Бутылки",
        items: [
          {
            id: "wine-07",
            name: "Barolo DOCG",
            description: "Италия, неббиоло, роза, табак, выдержанный стиль.",
            price: 18900,
            weight: "750 мл",
            badges: ["bottle", "premium"],
            image:
              "https://images.unsplash.com/photo-1566754436893-98224ee05be2?auto=format&fit=crop&w=900&q=80",
            pair: "Говядина",
          },
          {
            id: "wine-08",
            name: "Sancerre Blanc",
            description: "Франция, минеральность, цитрус, свежий финиш.",
            price: 14200,
            weight: "750 мл",
            badges: ["bottle"],
            image:
              "https://images.unsplash.com/photo-1504867693232-c4e5f27d4fbf?auto=format&fit=crop&w=900&q=80",
            pair: "Рыба",
          },
        ],
      },
    ],
  },
];

const badgeLabels = {
  hit: "Хит",
  new: "Новинка",
  meat: "Мясо",
  fish: "Рыба",
  light: "Лёгкое",
  vegetarian: "Vegetarian",
  spicy: "Острое",
  classic: "Классика",
  strong: "Крепкое",
  fresh: "Fresh",
  glass: "По бокалам",
  bottle: "Бутылка",
  premium: "Premium",
};

module.exports = {
  sections,
  badgeLabels,
};

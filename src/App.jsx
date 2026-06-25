import React, { useEffect, useMemo, useState } from "react";
import { NavLink, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarsStaggered,
  faBellConcierge,
  faChampagneGlasses,
  faChevronRight,
  faCircleCheck,
  faHeart,
  faMagnifyingGlass,
  faMartiniGlassCitrus,
  faMinus,
  faPlus,
  faRotateRight,
  faUtensils,
  faWineBottle,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";

const routeToSection = {
  "/dish-menu": "food",
  "/dish-menu/": "food",
  "/bar-menu": "bar",
  "/bar-menu/": "bar",
  "/wine-card": "wine",
  "/wine-card/": "wine",
};

const sectionIcons = {
  food: faUtensils,
  bar: faMartiniGlassCitrus,
  wine: faWineBottle,
};

const filters = [
  { id: "all", label: "Все" },
  { id: "hit", label: "Хиты" },
  { id: "new", label: "Новинки" },
  { id: "light", label: "Лёгкое" },
  { id: "vegetarian", label: "Vegetarian" },
  { id: "premium", label: "Premium" },
];

const formatPrice = (price) =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "KGS",
    maximumFractionDigits: 0,
  }).format(price);

const getSavedFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem("soulist:favorites") || "[]");
  } catch {
    return [];
  }
};

const findItem = (sections, itemId) => {
  for (const section of sections) {
    for (const category of section.categories) {
      const item = category.items.find((entry) => entry.id === itemId);

      if (item) {
        return { ...item, sectionTitle: section.title, categoryTitle: category.title };
      }
    }
  }

  return null;
};

function ElectronicMenu() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeSectionId, setActiveSectionId] = useState("food");
  const [activeCategoryId, setActiveCategoryId] = useState("signature");
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortMode, setSortMode] = useState("recommended");
  const [favorites, setFavorites] = useState(getSavedFavorites);
  const [basket, setBasket] = useState([]);
  const [orderStatus, setOrderStatus] = useState("");

  useEffect(() => {
    const nextSection = routeToSection[location.pathname] || activeSectionId;
    setActiveSectionId(nextSection);
  }, [activeSectionId, location.pathname]);

  useEffect(() => {
    let isMounted = true;

    const loadMenu = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetch("/api/menu");

        if (!response.ok) {
          throw new Error("API не отвечает");
        }

        const data = await response.json();

        if (isMounted) {
          setMenu(data);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || "Не удалось загрузить меню");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadMenu();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("soulist:favorites", JSON.stringify(favorites));
  }, [favorites]);

  const sections = useMemo(() => menu?.sections || [], [menu]);
  const badgeLabels = menu?.badgeLabels || {};
  const activeSection = sections.find((section) => section.id === activeSectionId) || sections[0];

  useEffect(() => {
    if (!activeSection) {
      return;
    }

    const hasCategory = activeSection.categories.some(
      (category) => category.id === activeCategoryId
    );

    if (!hasCategory) {
      setActiveCategoryId(activeSection.categories[0]?.id || "");
    }
  }, [activeCategoryId, activeSection]);

  const visibleCategories = useMemo(() => {
    if (!activeSection) {
      return [];
    }

    const normalizedQuery = query.trim().toLowerCase();

    return activeSection.categories
      .map((category) => {
        let items = category.items.filter((item) => {
          const matchesQuery = !normalizedQuery
            ? true
            : [item.name, item.description, item.pair, category.title]
                .join(" ")
                .toLowerCase()
                .includes(normalizedQuery);

          const matchesFilter =
            activeFilter === "all" ? true : item.badges.includes(activeFilter);

          return matchesQuery && matchesFilter;
        });

        if (sortMode === "price-low") {
          items = [...items].sort((a, b) => a.price - b.price);
        }

        if (sortMode === "price-high") {
          items = [...items].sort((a, b) => b.price - a.price);
        }

        return { ...category, items };
      })
      .filter((category) => category.items.length);
  }, [activeFilter, activeSection, query, sortMode]);

  const activeCategory =
    visibleCategories.find((category) => category.id === activeCategoryId) ||
    visibleCategories[0];

  const featured = useMemo(() => {
    if (!activeSection) {
      return [];
    }

    return activeSection.categories
      .flatMap((category) =>
        category.items
          .filter((item) => item.badges.includes("hit") || item.badges.includes("new"))
          .map((item) => ({ ...item, categoryTitle: category.title }))
      )
      .slice(0, 3);
  }, [activeSection]);

  const basketItems = useMemo(
    () =>
      basket
        .map((entry) => {
          const item = findItem(sections, entry.id);
          return item ? { ...item, quantity: entry.quantity } : null;
        })
        .filter(Boolean),
    [basket, sections]
  );

  const basketTotal = basketItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const changeSection = (section) => {
    setActiveSectionId(section.id);
    setActiveCategoryId(section.categories[0]?.id || "");
    setQuery("");
    setActiveFilter("all");
    navigate(`/${section.slug}`);
  };

  const updateQuantity = (itemId, delta) => {
    setOrderStatus("");
    setBasket((current) => {
      const existing = current.find((item) => item.id === itemId);

      if (!existing && delta > 0) {
        return [...current, { id: itemId, quantity: 1 }];
      }

      return current
        .map((item) =>
          item.id === itemId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0);
    });
  };

  const toggleFavorite = (itemId) => {
    setFavorites((current) =>
      current.includes(itemId)
        ? current.filter((id) => id !== itemId)
        : [...current, itemId]
    );
  };

  const submitOrder = async () => {
    if (!basketItems.length) {
      setOrderStatus("Добавьте позиции в заказ");
      return;
    }

    try {
      setOrderStatus("Отправляем заказ...");
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "demo-table",
          items: basketItems.map((item) => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
          total: basketTotal,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Заказ не принят");
      }

      setBasket([]);
      setOrderStatus(`Заказ ${data.order.id.slice(0, 8)} принят`);
    } catch (submitError) {
      setOrderStatus(submitError.message || "Не удалось отправить заказ");
    }
  };

  if (loading) {
    return (
      <div className="state-screen">
        <img src="/logo-soulist.png" alt="Soulist" />
        <p>Загружаем электронное меню</p>
      </div>
    );
  }

  if (error || !activeSection) {
    return (
      <div className="state-screen">
        <img src="/logo-soulist.png" alt="Soulist" />
        <p>{error || "Меню временно недоступно"}</p>
        <button className="primary-action" onClick={() => window.location.reload()}>
          <FontAwesomeIcon icon={faRotateRight} />
          Обновить
        </button>
      </div>
    );
  }

  return (
    <main className="app-shell">
      <section
        className="hero"
        style={{
          "--accent": activeSection.accent,
          backgroundImage: `linear-gradient(90deg, rgba(10, 10, 12, .94), rgba(10, 10, 12, .7), rgba(10, 10, 12, .2)), url(${activeSection.heroImage})`,
        }}
      >
        <nav className="topbar" aria-label="Главное меню">
          <NavLink to="/" className="brand" onClick={() => setActiveSectionId("food")}>
            <img src="/logo-soulist.png" alt="Soulist" />
            <span>Soulist</span>
          </NavLink>

          <div className="section-tabs" role="tablist" aria-label="Разделы">
            {sections.map((section) => (
              <button
                key={section.id}
                className={section.id === activeSection.id ? "tab is-active" : "tab"}
                onClick={() => changeSection(section)}
                type="button"
              >
                <FontAwesomeIcon icon={sectionIcons[section.id] || faBarsStaggered} />
                <span>{section.title}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="hero-content">
          <div className="hero-copy">
            <p className="eyebrow">{activeSection.eyebrow}</p>
            <h1>{activeSection.title}</h1>
            <p>{activeSection.description}</p>
          </div>

          <div className="hero-panel">
            <div>
              <span>Позиций</span>
              <strong>
                {activeSection.categories.reduce(
                  (sum, category) => sum + category.items.length,
                  0
                )}
              </strong>
            </div>
            <div>
              <span>Разделов</span>
              <strong>{activeSection.categories.length}</strong>
            </div>
            <div>
              <span>В заказе</span>
              <strong>{basketItems.reduce((sum, item) => sum + item.quantity, 0)}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="workspace" style={{ "--accent": activeSection.accent }}>
        <aside className="category-rail" aria-label="Категории">
          {activeSection.categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={category.id === activeCategory?.id ? "category is-active" : "category"}
              onClick={() => setActiveCategoryId(category.id)}
            >
              <span>{category.title}</span>
              <small>{category.items.length}</small>
            </button>
          ))}
        </aside>

        <div className="menu-area">
          <div className="toolbar">
            <label className="search-field">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Поиск по меню"
              />
              {query && (
                <button type="button" onClick={() => setQuery("")} aria-label="Очистить поиск">
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              )}
            </label>

            <div className="filter-row" aria-label="Фильтры">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  className={filter.id === activeFilter ? "filter is-active" : "filter"}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <select value={sortMode} onChange={(event) => setSortMode(event.target.value)}>
              <option value="recommended">Рекомендуем</option>
              <option value="price-low">Цена: ниже</option>
              <option value="price-high">Цена: выше</option>
            </select>
          </div>

          <div className="featured-strip" aria-label="Рекомендации">
            {featured.map((item) => (
              <button
                key={item.id}
                type="button"
                className="featured"
                onClick={() => updateQuantity(item.id, 1)}
              >
                <img src={item.image} alt="" loading="lazy" />
                <span>
                  <small>{item.categoryTitle}</small>
                  {item.name}
                </span>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            ))}
          </div>

          {visibleCategories.length ? (
            <div className="category-stack">
              {(activeCategory ? [activeCategory] : visibleCategories).map((category) => (
                <section className="menu-section" key={category.id}>
                  <div className="section-heading">
                    <p>{activeSection.title}</p>
                    <h2>{category.title}</h2>
                  </div>

                  <div className="card-grid">
                    {category.items.map((item) => {
                      const quantity =
                        basket.find((basketItem) => basketItem.id === item.id)?.quantity || 0;
                      const isFavorite = favorites.includes(item.id);

                      return (
                        <article className="dish-card" key={item.id}>
                          <div className="dish-photo">
                            <img src={item.image} alt={item.name} loading="lazy" />
                            <button
                              type="button"
                              className={isFavorite ? "favorite is-active" : "favorite"}
                              onClick={() => toggleFavorite(item.id)}
                              aria-label="В избранное"
                            >
                              <FontAwesomeIcon icon={faHeart} />
                            </button>
                          </div>

                          <div className="dish-content">
                            <div className="badge-row">
                              {item.badges.map((badge) => (
                                <span key={badge}>{badgeLabels[badge] || badge}</span>
                              ))}
                            </div>
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <div className="pairing">
                              <FontAwesomeIcon icon={faChampagneGlasses} />
                              {item.pair}
                            </div>
                          </div>

                          <div className="dish-footer">
                            <div>
                              <strong>{formatPrice(item.price)}</strong>
                              <span>{item.weight}</span>
                            </div>
                            <div className="quantity">
                              {quantity > 0 && (
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, -1)}
                                  aria-label={`Убрать ${item.name}`}
                                >
                                  <FontAwesomeIcon icon={faMinus} />
                                </button>
                              )}
                              {quantity > 0 && <span>{quantity}</span>}
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, 1)}
                                aria-label={`Добавить ${item.name}`}
                              >
                                <FontAwesomeIcon icon={faPlus} />
                              </button>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <p>Ничего не найдено</p>
            </div>
          )}
        </div>

        <aside className="order-panel" aria-label="Заказ">
          <div className="order-header">
            <div>
              <span>Ваш стол</span>
              <strong>Demo</strong>
            </div>
            <FontAwesomeIcon icon={faBellConcierge} />
          </div>

          <div className="order-list">
            {basketItems.length ? (
              basketItems.map((item) => (
                <div className="order-item" key={item.id}>
                  <img src={item.image} alt="" loading="lazy" />
                  <div>
                    <strong>{item.name}</strong>
                    <span>
                      {item.quantity} x {formatPrice(item.price)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, -1)}
                    aria-label={`Убрать ${item.name}`}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                </div>
              ))
            ) : (
              <div className="order-empty">Заказ пока пуст</div>
            )}
          </div>

          <div className="order-total">
            <span>Итого</span>
            <strong>{formatPrice(basketTotal)}</strong>
          </div>

          <button className="primary-action" type="button" onClick={submitOrder}>
            <FontAwesomeIcon icon={faCircleCheck} />
            Оформить
          </button>
          {orderStatus && <p className="order-status">{orderStatus}</p>}
        </aside>
      </section>
    </main>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<ElectronicMenu />} />
      <Route path="/dish-menu" element={<ElectronicMenu />} />
      <Route path="/bar-menu" element={<ElectronicMenu />} />
      <Route path="/wine-card" element={<ElectronicMenu />} />
    </Routes>
  );
}

export default App;

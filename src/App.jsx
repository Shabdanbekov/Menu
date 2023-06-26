import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainMenu from "./Components/MainMenu/MainMenu";
import ScrollableDishMenu from "./SkrollMenu";
import DishDetails from "./Components/DishDetails/DishDetails";
import BarDetails from "./Components/BarDetails/BarDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/DishMenu/" element={<ScrollableDishMenu />} />
        <Route path="/dish/:id" element={<DishDetails />} />
        <Route path="/bar/:id" element={<BarDetails />} />
      </Routes>
    </>
  );
}

export default App;

// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import "./App.css";
// import MainMenu from "./Components/MainMenu/MainMenu";
// import ScrollableDishMenu from "./SkrollableDish";
// import DishDetails from "./Components/DishDetails/DishDetails";
// import BarDetails from "./Components/BarDetails/BarDetails";

// function App() {
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<MainMenu />} />
//         <Route path="/DishMenu/" element={<ScrollableDishMenu />} />
//         <Route path="/dish/:id" element={<DishDetails />} />
//         <Route path="/bar/:id" element={<BarDetails />} />
//       </Routes>
//     </>
//   );
// }

// export default App;

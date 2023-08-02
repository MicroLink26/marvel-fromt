import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useState } from "react";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
library.add(faStar);
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Comics from "./pages/Comics";
import ComicDetail from "./pages/ComicDetail";
import CharacterDetail from "./pages/CharacterDetail";
import Favorites from "./pages/Favorites";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/comics" element={<Comics />} />
          <Route path="/comicdetail/:id" element={<ComicDetail />} />
          <Route path="/characterdetail/:id" element={<CharacterDetail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

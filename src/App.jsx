import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useState } from "react";
import Cookies from "js-cookie";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faStar,
  faSearch,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
library.add(faStar, faSearch, faArrowLeft, faArrowRight);

import Home from "./pages/Characters";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Comics from "./pages/Comics";
import ComicDetail from "./pages/ComicDetail";
import CharacterDetail from "./pages/CharacterDetail";
import Favorites from "./pages/Favorites";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("token") || "");

  return (
    <Router>
      <Header userToken={userToken} setUserToken={setUserToken} />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/comics" element={<Comics />} />
          <Route path="/comicdetail/:id" element={<ComicDetail />} />
          <Route path="/characterdetail/:id" element={<CharacterDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route
            path="/signup"
            element={<Signup setUserToken={setUserToken} />}
          />
          <Route
            path="/login"
            element={<Login setUserToken={setUserToken} />}
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Header = ({ userToken, setUserToken }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const handleDisconnect = () => {
    setOpenMenu(false);
    Cookies.remove("token");
    setUserToken("");
    localStorage.setItem("favoritesCharacters", JSON.stringify([]));
    localStorage.setItem("favoritesComics", JSON.stringify([]));

    navigate("/");
  };
  return (
    <header className="container">
      <Link to="/">
        <img src={logo} />
      </Link>
      <ul>
        <li>
          <Link to="/">Personnages</Link>
        </li>
        <li>
          <Link to="/comics">Comics</Link>
        </li>
        <li>
          <Link to="/favorites">Mes coups de c&oelig;urs</Link>
        </li>
        {userToken ? (
          <>
            <li>
              <a href="#" onClick={handleDisconnect}>
                Se déconnecter
              </a>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Se connecter</Link>
            </li>
            <li>
              <Link to="/signup">S'inscrire</Link>
            </li>
          </>
        )}
      </ul>

      <div className="mobile-menu">
        <FontAwesomeIcon
          icon="fa-solid fa-bars"
          onClick={() => setOpenMenu(true)}
        />

        {openMenu && (
          <div className="menu">
            <div className="close">
              <FontAwesomeIcon
                icon="fa-solid fa-xmark"
                onClick={() => setOpenMenu(false)}
              />
            </div>
            <ul>
              <li>
                <Link to="/" onClick={() => setOpenMenu(false)}>
                  Personnages
                </Link>
              </li>
              <li>
                <Link to="/comics" onClick={() => setOpenMenu(false)}>
                  Comics
                </Link>
              </li>
              <li>
                <Link to="/favorites" onClick={() => setOpenMenu(false)}>
                  Mes coups de c&oelig;urs
                </Link>
              </li>
              {userToken ? (
                <>
                  <li>
                    <a href="#" onClick={handleDisconnect}>
                      Se déconnecter
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" onClick={() => setOpenMenu(false)}>
                      Se connecter
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup" onClick={() => setOpenMenu(false)}>
                      S'inscrire
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

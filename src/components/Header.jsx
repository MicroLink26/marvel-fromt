import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const Header = ({ userToken, setUserToken }) => {
  const navigate = useNavigate();
  const handleDisconnect = () => {
    Cookies.remove("token");
    setUserToken("");
    navigate("/");
  };
  return (
    <header className="container">
      <img src={logo} />
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
              <a>Mon profil</a>
            </li>
            <li>
              <a onClick={handleDisconnect}>Se déconnecter</a>
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

        {/* <li>Login</li> */}
      </ul>
    </header>
  );
};

export default Header;

import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
const Header = () => {
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
        <li>Mon profil</li>
        {/* <li>Login</li> */}
      </ul>
    </header>
  );
};

export default Header;

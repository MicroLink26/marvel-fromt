import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "../styles/login.css";
import api from "../services/api";

import Spinner from "../components/Spinner";

export default function Login({ setUserToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const setFavorites = async () => {
    if (Cookies.get("token")) {
      const favorites = await api.fetchfavorites();

      localStorage.setItem(
        "favoritesCharacters",
        JSON.stringify(favorites.data.characters)
      );
      localStorage.setItem(
        "favoritesComics",
        JSON.stringify(favorites.data.comics)
      );
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    if (!email || !password) {
      setErrorMessage("Veuillez remplir tous les champs !");
    } else {
      try {
        const { data } = await axios.post(
          import.meta.env.VITE_API_URL + "/user/login",
          {
            email: email,
            password: password,
          }
        );

        Cookies.set("token", data.token);

        // changer la valeur du state
        setUserToken(data.token);
        setProcessing(false);
        setFavorites();
        //si redirigé d'une autre page
        if (location.state) {
          navigate(location.state.from, {
            state: { ...location.state },
          });
        } else navigate("/");
        // sinon naviguer vers la page d'accueil
      } catch (error) {
        setProcessing(false);
        if (error.code === "ERR_BAD_REQUEST")
          setErrorMessage(
            "Le mot de passe ne correspont pas avec l'adresse mail"
          );
        else setErrorMessage("Erreur du server, veuillez réessaye plus tard!"); //à priori un pb d'infra
      }
    }
  };

  return processing ? (
    <Spinner />
  ) : (
    <form onSubmit={handleSubmit} className="custom-form">
      <h2>Se connecter</h2>

      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        value={email}
        onChange={(event) => {
          // vider le message d'erreur
          setErrorMessage("");
          // envoyer la valeur entrée dans le champs au state
          setEmail(event.target.value);
        }}
      />

      <input
        type="password"
        name="password"
        id="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(event) => {
          setErrorMessage("");
          setPassword(event.target.value);
        }}
      />

      <button className="publish-button">Se connecter</button>
      <Link to="/signup">Pas encore de compte ? Inscris-toi !</Link>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
}

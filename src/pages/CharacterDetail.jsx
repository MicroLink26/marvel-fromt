import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../styles/characterdetail.css";

import Spinner from "../components/Spinner";

const CharacterDetail = () => {
  const [character, setCharacter] = useState({});
  const [comicsList, setComicsList] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingComics, setIsLoadingComics] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + "/character/" + id
        );

        setCharacter(response.data);

        setIsLoading(false);
        //load comics
        try {
          const { data } = await axios.post(
            import.meta.env.VITE_API_URL + "/comics/",
            { comics: response.data.comics }
          );

          setComicsList(data);
          setIsLoadingComics(false);
        } catch (error) {
          console.log("catch comicsS>>", error);
        }

        //console.log(response.data);
      } catch (error) {
        console.log("catch detail>>", error);
      }
    };

    fetchData();
  }, []);

  const addToStorage = async () => {
    let favoritesCharacters =
      JSON.parse(localStorage.getItem("favoritesCharacters")) || [];

    const favoriteIndex = favoritesCharacters.findIndex((element) => {
      return element === id;
    });

    if (favoriteIndex === -1) {
      favoritesCharacters.push(id);

      setIsFavorite(true);
    } else {
      favoritesCharacters.splice(favoriteIndex, 1);
      setIsFavorite(false);
    }

    localStorage.setItem(
      "favoritesCharacters",
      JSON.stringify(favoritesCharacters)
    );
    await api.updateFavorites();
  };

  const findInStorage = () => {
    const favoritesCharacters =
      JSON.parse(localStorage.getItem("favoritesCharacters")) || [];
    const favoriteIndex = favoritesCharacters.findIndex((element) => {
      return element === id;
    });

    return favoriteIndex === -1 ? false : true;
  };

  //should be done after findInStorage
  const [isFavorite, setIsFavorite] = useState(findInStorage());
  return isLoading ? (
    <Spinner />
  ) : (
    <div className="characterDetail">
      <h2>
        {character.name}{" "}
        <FontAwesomeIcon
          icon="heart"
          className={isFavorite ? "favorite mouse-hover" : "mouse-hover"}
          onClick={addToStorage}
          title={isFavorite ? "Supprimer des favoris" : "Ajouter aux favoris"}
        />
      </h2>
      <div className="encart">
        <p>{character.description.replaceAll("&#39;", "'")}</p>
        <img
          src={
            character.thumbnail.path.replace("http", "https") +
            "." +
            character.thumbnail.extension
          }
        />
      </div>
      <h2>Comics où apparait {character.name}</h2>
      <div className="comics-container">
        {isLoadingComics ? (
          <>
            <a>
              <div>
                <p> </p>
                <img></img>
              </div>
            </a>
            <a>
              <div>
                <p></p>
                <img></img>
              </div>
            </a>
            <a>
              <div>
                <p> </p>
                <img></img>
              </div>
            </a>
          </>
        ) : (
          comicsList.map((comic) => {
            const imageUrl = `${comic.thumbnail.path.replace(
              "http",
              "https"
            )}/portrait_uncanny.${comic.thumbnail.extension}`;
            return (
              <Link to={`/comicdetail/${comic._id}`} key={comic._id}>
                <div>
                  <p>{comic.title}</p>

                  <img src={imageUrl} />
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CharacterDetail;

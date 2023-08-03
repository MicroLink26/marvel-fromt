import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "../styles/characterdetail.css";

import Spinner from "../components/Spinner";

const CharacterDetail = () => {
  const [character, setCharacter] = useState({});
  const [comicsList, setComicsList] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingComics, setIsLoadingComics] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    //console.log(import.meta.env.VITE_API_URL);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + "/character/" + id
        );

        setCharacter(response.data);
        console.log(response.data.comics);
        setIsLoading(false);
        //load comics
        try {
          const { data } = await axios.post(
            import.meta.env.VITE_API_URL + "/comics/",
            { comics: response.data.comics }
          );
          console.log(data);
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

  const addToStorage = () => {
    //console.log(localStorage.getItem("favoritesCharacters"));
    //check if id is in favoritesCharacters
    let favoritesCharacters =
      JSON.parse(localStorage.getItem("favoritesCharacters")) || [];

    //console.log(favoritesCharacters);
    const favoriteIndex = favoritesCharacters.findIndex((element) => {
      return element === id;
    });
    //console.log(favoriteIndex);
    if (favoriteIndex === -1) {
      favoritesCharacters.push(id);
      //console.log(favoritesCharacters);
      setIsFavorite(true);
    } else {
      favoritesCharacters.splice(favoriteIndex, 1);
      setIsFavorite(false);
    }
    //console.log(favoritesCharacters);
    localStorage.setItem(
      "favoritesCharacters",
      JSON.stringify(favoritesCharacters)
    );
    //localStorage.setItem("favoritesCharacters", favoritesCharacters);
    //console.log(localStorage.getItem("favoritesCharacters"));
  };

  const findInStorage = () => {
    const favoritesCharacters =
      JSON.parse(localStorage.getItem("favoritesCharacters")) || [];
    const favoriteIndex = favoritesCharacters.findIndex((element) => {
      return element === id;
    });

    // console.log(favoriteIndex, id);
    // console.log(favoritesCharacters);
    return favoriteIndex === -1 ? false : true;
  };

  //should be done after findInStorage
  const [isFavorite, setIsFavorite] = useState(findInStorage());
  return isLoading ? (
    <Spinner />
  ) : (
    <div className="characterDetail">
      <h2>
        <FontAwesomeIcon
          icon="star"
          className={isFavorite ? "favorite" : ""}
          onClick={addToStorage}
        />
        {character.name}
      </h2>
      <div className="encart">
        <p>{character.description}</p>
        <img
          src={character.thumbnail.path + "." + character.thumbnail.extension}
        />
      </div>
      <h2>Comics</h2>
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
            const imageUrl = `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`;
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

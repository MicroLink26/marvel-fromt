import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

import "../styles/favorites.css";
import Spinner from "../components/Spinner";
const Favorites = () => {
  const [characterList, setCharacterList] = useState([]);
  const [comicList, setComicList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingComics, setIsLoadingComics] = useState(true);

  const [hasFavoritesComics, setHasFavoritesComics] = useState(false);
  const [hasFavoritesCharacters, setHasFavoritesCharacters] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          import.meta.env.VITE_API_URL + "/characters",
          {
            characters:
              JSON.parse(localStorage.getItem("favoritesCharacters")) || [],
          }
        );
        //console.log(response.data);
        setCharacterList(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("catch home>>>", error);
      }
      try {
        const response = await axios.post(
          import.meta.env.VITE_API_URL + "/comics",
          {
            comics: JSON.parse(localStorage.getItem("favoritesComics")) || [],
          }
        );
        //console.log(response.data);
        setComicList(response.data);
        setIsLoadingComics(false);
      } catch (error) {
        console.log("catch home>>>", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (characterList.length > 0) setHasFavoritesCharacters(true);

    if (comicList.length > 0) setHasFavoritesComics(true);
  }, [characterList, comicList]);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      {hasFavoritesCharacters | hasFavoritesComics ? (
        <button
          onClick={async () => {
            localStorage.setItem("favoritesCharacters", JSON.stringify([]));
            localStorage.setItem("favoritesComics", JSON.stringify([]));
            await api.updateFavorites();
            setCharacterList([]);
            setComicList([]);
            setHasFavoritesCharacters(false);
            setHasFavoritesComics(false);
          }}
        >
          Reset favorites
        </button>
      ) : (
        <p>Aucun favori</p>
      )}
      {hasFavoritesCharacters && (
        <>
          <h2>Characters</h2>
          <div className="characters-container  fade-in">
            {characterList.map((character) => {
              const imageUrl = `${character.thumbnail.path.replace(
                "http",
                "https"
              )}/portrait_uncanny.${character.thumbnail.extension}`;
              return (
                <Link
                  to={`/characterdetail/${character._id}`}
                  key={character._id}
                >
                  <div>
                    <p>{character.name}</p>

                    <img src={imageUrl} />
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}
      {hasFavoritesComics && (
        <>
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
              comicList.map((comic) => {
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
        </>
      )}
    </>
  );
};

export default Favorites;

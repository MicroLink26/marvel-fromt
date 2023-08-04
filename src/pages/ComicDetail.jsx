import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/comicdetail.css";

import Spinner from "../components/Spinner";
const ComicDetail = () => {
  const [comic, setComic] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    //console.log(import.meta.env.VITE_API_URL);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + "/comic/" + id
        );

        setComic(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("catch comic>>>", error);
      }
    };

    fetchData();
  }, []);

  const addToStorage = () => {
    //console.log(localStorage.getItem("favoritesComics"));
    //check if id is in favoritesComics
    let favoritesComics =
      JSON.parse(localStorage.getItem("favoritesComics")) || [];

    //console.log(favoritesComics);
    const favoriteIndex = favoritesComics.findIndex((element) => {
      return element === id;
    });
    //console.log(favoriteIndex);
    if (favoriteIndex === -1) {
      favoritesComics.push(id);
      //console.log(favoritesComics);
      setIsFavorite(true);
    } else {
      favoritesComics.splice(favoriteIndex, 1);
      setIsFavorite(false);
    }
    //console.log(favoritesComics);
    localStorage.setItem("favoritesComics", JSON.stringify(favoritesComics));
    //localStorage.setItem("favoritesComics", favoritesComics);
    //console.log(localStorage.getItem("favoritesComics"));
  };

  const findInStorage = () => {
    const favoritesComics =
      JSON.parse(localStorage.getItem("favoritesComics")) || [];
    const favoriteIndex = favoritesComics.findIndex((element) => {
      return element === id;
    });

    // console.log(favoriteIndex, id);
    // console.log(favoritesComics);
    return favoriteIndex === -1 ? false : true;
  };

  //should be done after findInStorage
  const [isFavorite, setIsFavorite] = useState(findInStorage());

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="comicDetail">
      <h2>
        <FontAwesomeIcon
          icon="star"
          className={isFavorite ? "favorite mouse-hover" : "mouse-hover"}
          onClick={addToStorage}
          title={isFavorite ? "Supprimer des favoris" : "Ajouter aux favoris"}
        />
        {comic.title}
      </h2>
      <div className="encart">
        <p>{comic.description.replaceAll("&#39;", "'")}</p>
        <img
          src={
            comic.thumbnail.path.replace("http", "https") +
            "." +
            comic.thumbnail.extension
          }
        />
      </div>
    </div>
  );
};

export default ComicDetail;

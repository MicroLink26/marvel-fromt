import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/comics.css";
import SearchBar from "../components/SearchBar";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";
import api from "../services/api";
import Cookies from "js-cookie";

const Comics = () => {
  const [comicsList, setComicsList] = useState([]);
  const [results, setRessult] = useState(0);
  const [page, setPage] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchText, setSearchText] = useState("");

  const findInStorage = (id) => {
    const favoritesComics =
      JSON.parse(localStorage.getItem("favoritesComics")) || [];
    const favoriteIndex = favoritesComics.findIndex((element) => {
      return element === id;
    });

    return favoriteIndex === -1 ? false : true;
  };

  useEffect(() => {
    if (page < 0) setPage(0);
    setIsLoadingMore(true);
    const loadMore = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/comics?skip=${
            page * 100 > 0 ? page * 100 : 0
          }&title=${searchText}`
        );
        setRessult(response.data.count);
        setComicsList(response.data.results);
        setIsLoadingMore(false);
      } catch (error) {
        console.log("catch home>>>", error);
      }
    };
    loadMore();
  }, [page, searchText]);
  useEffect(() => {
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

    setFavorites();
  }, []);
  const handlePageChange = (event) => {
    const value = event.target.value;

    if (value < 1 || typeof value === "string") {
      setPage(0);
    }
    if (value > Math.floor(results / 100) + 1) {
      setPage(Math.floor(results / 100));
    }

    setPage(event.target.value - 1);
  };
  return (
    <>
      <SearchBar
        setPage={setPage}
        setSearchText={setSearchText}
        searchText={searchText}
      />
      <div>
        {results} comic{results > 1 && "s"} trouvé{results > 1 && "s"}
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        handlePageChange={handlePageChange}
        results={results}
      />
      {isLoadingMore ? (
        <Spinner />
      ) : (
        <div className="comics-container">
          {comicsList.map((comic) => {
            const imageUrl = `${comic.thumbnail.path.replace(
              "http",
              "https"
            )}/portrait_uncanny.${comic.thumbnail.extension}`;
            return (
              <Link to={`/comicdetail/${comic._id}`} key={comic._id}>
                <div>
                  <p>
                    {findInStorage(comic._id) && (
                      <FontAwesomeIcon icon="star" className="favorite" />
                    )}

                    {comic.title}
                  </p>

                  <img src={imageUrl} />
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {results === 0 && (
        <span>Pas de résultats correspondants à la recherche</span>
      )}
    </>
  );
};

export default Comics;

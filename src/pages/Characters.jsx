import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/home.css";
import SearchBar from "../components/SearchBar";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";
import api from "../services/api";
import Cookies from "js-cookie";

const Home = () => {
  const [characterList, setCharacterList] = useState([]);
  //const [isLoading, setIsLoading] = useState(true);
  const [results, setResult] = useState(0);
  const [page, setPage] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(100);

  const findInStorage = (id) => {
    const favoritesCharacters =
      JSON.parse(localStorage.getItem("favoritesCharacters")) || [];
    const favoriteIndex = favoritesCharacters.findIndex((element) => {
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
          `${import.meta.env.VITE_API_URL}/characters?skip=${
            page * pageSize > 0 ? page * pageSize : 0
          }&name=${searchText}&limit=${pageSize}`
        );
        setResult(response.data.count);

        setCharacterList(response.data.results);
        setIsLoadingMore(false);
      } catch (error) {
        console.log("catch home>>>", error);
      }
    };
    loadMore();
  }, [page, searchText]);

  useEffect(() => {
    setPage(0);
    setIsLoadingMore(true);
    const loadMore = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/characters?skip=${
            page * pageSize > 0 ? page * pageSize : 0
          }&name=${searchText}&limit=${pageSize}`
        );
        setResult(response.data.count);

        setCharacterList(response.data.results);
        setIsLoadingMore(false);
      } catch (error) {
        console.log("catch home>>>", error);
      }
    };
    loadMore();
  }, [pageSize]);

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
    const value = event.target.value ?? 0;

    console.log(value);

    if (value < 1 || typeof value === "string") {
      setPage(0);
      console.log("string");
    } else if (value > Math.floor(results / pageSize) + 1) {
      setPage(Math.floor(results / pageSize));
      console.log("page :", page);
    } else {
      setPage(event.target.value - 1);
    }
  };
  return (
    <>
      <SearchBar
        setPage={setPage}
        setSearchText={setSearchText}
        searchText={searchText}
        searchPlaceHolder="Rechercher un personnage"
      />

      <div>
        {results} personnage{results > 1 && "s"} trouvé{results > 1 && "s"}
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        handlePageChange={handlePageChange}
        results={results}
        pageSize={pageSize}
        setPageSize={setPageSize}
        name="Characters"
      />
      {isLoadingMore ? (
        <Spinner />
      ) : (
        <div className="characters-container fade-in">
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
                  <p>
                    {character.name}{" "}
                    {findInStorage(character._id) && (
                      <FontAwesomeIcon icon="heart" className="favorite" />
                    )}
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

export default Home;

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/home.css";
import SearchBar from "../components/SearchBar";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";

const Home = () => {
  const [characterList, setCharacterList] = useState([]);
  //const [isLoading, setIsLoading] = useState(true);
  const [results, setRessult] = useState(0);
  const [page, setPage] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchText, setSearchText] = useState("");

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
            page * 100 > 0 ? page * 100 : 0
          }&name=${searchText}`
        );
        setRessult(response.data.count);
        setCharacterList(response.data.results);
        setIsLoadingMore(false);
      } catch (error) {
        console.log("catch home>>>", error);
      }
    };
    loadMore();
  }, [page, searchText]);

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
        {results} personnage{results > 1 && "s"} trouvé{results > 1 && "s"}
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
        <div className="characters-container">
          {characterList.map((character) => {
            const imageUrl = `${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`;
            return (
              <Link
                to={`/characterdetail/${character._id}`}
                key={character._id}
              >
                <div>
                  <p>
                    {findInStorage(character._id) && (
                      <FontAwesomeIcon icon="star" className="favorite" />
                    )}
                    {character.name}
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

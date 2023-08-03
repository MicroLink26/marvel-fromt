import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/home.css";

import Spinner from "../components/Spinner";

const Home = () => {
  const [characterList, setCharacterList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [results, setRessult] = useState(0);
  const [page, setPage] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + "/characters"
        );
        //console.log(response.data.results);
        setCharacterList(response.data.results);
        setRessult(response.data.count);
        setIsLoading(false);
      } catch (error) {
        console.log("catch home>>>", error);
      }
    };

    fetchData();
  }, []);

  const findInStorage = (id) => {
    const favoritesCharacters =
      JSON.parse(localStorage.getItem("favoritesCharacters")) || [];
    const favoriteIndex = favoritesCharacters.findIndex((element) => {
      return element === id;
    });

    return favoriteIndex === -1 ? false : true;
  };

  useEffect(() => {
    setIsLoadingMore(true);
    const loadMore = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/characters?skip=${
            page * 100
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
  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Recherche des personnages"
          value={searchText}
          onChange={(event) => {
            setSearchText(event.target.value);
            setPage(0);
          }}
        ></input>
        <i className="fa-solid fa-search search-input-icon"></i>
      </div>
      <div>
        {" "}
        {results} personnage{results > 1 && "s"} trouvé{results > 1 && "s"}
      </div>
      <div className="pagination">
        <i
          onClick={() => {
            setPage(page - 1);
          }}
          className={
            page === 0
              ? "hidden fa-solid fa-arrow-left"
              : "fa-solid fa-arrow-left"
          }
        ></i>
        <span>page {page + 1}</span>
        <i
          className={
            page === Math.floor(results / 100)
              ? "hidden fa-solid fa-arrow-left"
              : "fa-solid fa-arrow-right"
          }
          onClick={() => {
            setPage(page + 1);
          }}
        ></i>
      </div>

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
                    <FontAwesomeIcon
                      icon="star"
                      className={findInStorage(character._id) ? "favorite" : ""}
                    />{" "}
                    {character.name}
                  </p>

                  <img src={imageUrl} />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Home;

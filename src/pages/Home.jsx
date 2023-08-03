import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/home.css";

import Spinner from "../components/Spinner";

const Home = () => {
  const [characterList, setCharacterList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + "/characters"
        );
        console.log(response.data.results);
        setCharacterList(response.data.results);
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
  const handdleScroll = (event) => {
    console.log(event);
  };

  //  import.meta.env.VITE_API_URL + "/characters?skip=" + page * 100
  useEffect(() => {
    if (page != 0) {
      setIsLoadingMore(true);
      const loadMore = async () => {
        try {
          const response = await axios.get(
            import.meta.env.VITE_API_URL + "/characters?skip=" + page * 100
          );
          characterList.push(...response.data.results);
          setCharacterList([...characterList]);
          setIsLoadingMore(false);
        } catch (error) {
          console.log("catch home>>>", error);
        }
      };
      loadMore();
    }
  }, [page]);
  return isLoading ? (
    <Spinner />
  ) : (
    <div className="characters-container">
      {characterList.map((character) => {
        const imageUrl = `${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`;
        return (
          <Link to={`/characterdetail/${character._id}`} key={character._id}>
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
      {isLoadingMore ? (
        <div className="loading-more">
          <Spinner />
        </div>
      ) : (
        <a>
          <button
            onClick={() => {
              setPage(page + 1);
            }}
            className="loading-more"
          >
            Charger plus
          </button>
        </a>
      )}
    </div>
  );
};

export default Home;

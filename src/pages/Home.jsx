import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/home.css";

import Spinner from "../components/Spinner";

const Home = () => {
  const [characterList, setCharacterList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(import.meta.env.VITE_API_URL);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + "/characters"
        );

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
    </div>
  );
};

export default Home;

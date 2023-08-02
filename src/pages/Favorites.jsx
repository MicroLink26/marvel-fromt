import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../styles/favorites.css";
import Spinner from "../components/Spinner";
const Favorites = () => {
  const [characterList, setCharacterList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    console.log(import.meta.env.VITE_API_URL);
    const fetchData = async () => {
      try {
        const response = await axios.post(
          import.meta.env.VITE_API_URL + "/characters",
          {
            characters:
              JSON.parse(localStorage.getItem("favoritesCharacters")) || [],
          }
        );
        console.log(response.data);
        setCharacterList(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("catch home>>>", error);
      }
    };

    fetchData();
  }, []);
  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <h2>Characters</h2>
      <div className="characters-container">
        {characterList.map((character) => {
          const imageUrl = `${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`;
          return (
            <Link to={`/characterdetail/${character._id}`} key={character._id}>
              <div>
                <p>{character.name}</p>

                <img src={imageUrl} />
              </div>
            </Link>
          );
        })}
      </div>
      <h2>Comics</h2>
      <div></div>
    </>
  );
};

export default Favorites;

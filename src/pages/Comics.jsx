import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "../components/Spinner";
import "../styles/comics.css";

const Comics = () => {
  const [comicsList, setComicsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  useEffect(() => {
    console.log(import.meta.env.VITE_API_URL);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + "/comics"
        );

        setComicsList(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log("catch comics>>>", error);
      }
    };

    fetchData();
  }, []);

  const findInStorage = (id) => {
    const favoritesComics =
      JSON.parse(localStorage.getItem("favoritesComics")) || [];
    const favoriteIndex = favoritesComics.findIndex((element) => {
      return element === id;
    });

    return favoriteIndex === -1 ? false : true;
  };

  useEffect(() => {
    if (page != 0) {
      setIsLoadingMore(true);
      const loadMore = async () => {
        try {
          const response = await axios.get(
            import.meta.env.VITE_API_URL + "/comics?skip=" + page * 100
          );
          comicsList.push(...response.data.results);
          setComicsList([...comicsList]);
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
    <div className="comics-container">
      {comicsList.map((comic) => {
        const imageUrl = `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`;
        return (
          <Link to={`/comicdetail/${comic._id}`} key={comic._id}>
            <div>
              <p>
                <FontAwesomeIcon
                  icon="star"
                  className={findInStorage(comic._id) ? "favorite" : ""}
                />
                {comic.title}
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

export default Comics;

import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import "../styles/comics.css";

const Comics = () => {
  const [comicsList, setComicsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="comics-container">
      {comicsList.map((comic) => {
        const imageUrl = `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`;
        return (
          <div key={comic._id}>
            <p>{comic.title}</p>

            <img src={imageUrl} />
          </div>
        );
      })}
    </div>
  );
};

export default Comics;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar = ({ setPage, setSearchText, searchText }) => {
  return (
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
      <FontAwesomeIcon
        icon="search"
        className="search-input-icon"
      ></FontAwesomeIcon>
    </div>
  );
};

export default SearchBar;

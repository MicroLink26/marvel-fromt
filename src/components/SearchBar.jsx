import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar = ({
  setPage,
  setSearchText,
  searchText,
  searchPlaceHolder,
}) => {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder={searchPlaceHolder}
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

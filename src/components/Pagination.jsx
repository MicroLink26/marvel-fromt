import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Pagination = ({ page, setPage, handlePageChange, results }) => {
  return (
    <div
      className={results > 9999 ? "pagination lot-of-results" : "pagination"}
    >
      <FontAwesomeIcon
        icon="fa-solid fa-arrow-left"
        className={page === 0 ? "hidden" : ""}
        onClick={() => {
          setPage(page - 1);
        }}
        size="2x"
      ></FontAwesomeIcon>

      <span>
        <input
          type="number"
          value={page + 1}
          onChange={handlePageChange}
          onMouseOut={handlePageChange}
        />
        /{Math.floor(results / 100) + 1}
      </span>
      <FontAwesomeIcon
        icon="fa-solid fa-arrow-right"
        className={page === Math.floor(results / 100) ? "hidden" : ""}
        onClick={() => {
          setPage(page + 1);
        }}
        size="2x"
      ></FontAwesomeIcon>
    </div>
  );
};

export default Pagination;

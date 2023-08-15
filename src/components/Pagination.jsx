import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Pagination = ({
  page,
  setPage,
  handlePageChange,
  results,
  setPageSize,
  pageSize,
  name,
}) => {
  return (
    <>
      <div
        className={results > 9999 ? "pagination lot-of-results" : "pagination"}
      >
        <FontAwesomeIcon
          icon="fa-solid fa-backward-fast"
          className={page === 0 ? "hidden backward-icon" : "backward-icon"}
          onClick={() => {
            setPage(0);
          }}
          size="2x"
        ></FontAwesomeIcon>
        <FontAwesomeIcon
          icon="fa-solid fa-arrow-left"
          className={page === 0 ? "hidden" : ""}
          onClick={() => {
            setPage(page - 1);
          }}
          size="2x"
        ></FontAwesomeIcon>

        <span>
          {page + 1}/{~~(results / pageSize)}
        </span>
        <FontAwesomeIcon
          icon="fa-solid fa-arrow-right"
          className={page === ~~(results / pageSize) - 1 ? "hidden" : ""}
          onClick={() => {
            setPage(page + 1);
          }}
          size="2x"
        ></FontAwesomeIcon>

        <FontAwesomeIcon
          icon="fa-solid fa-forward-fast"
          className={
            page === ~~(results / pageSize) - 1
              ? "hidden forward-icon"
              : "forward-icon"
          }
          onClick={() => {
            setPage(~~(results / pageSize) - 1);
          }}
          size="2x"
        ></FontAwesomeIcon>
      </div>
      <div className="pagination">
        {name} per page
        <select
          value={pageSize}
          onChange={(event) => {
            setPageSize(event.target.value);
          }}
        >
          <option>1</option>
          {results > 3 && <option>3</option>}
          {results > 10 && <option>10</option>}
          {results > 20 && <option>20</option>}
          {results > 30 && <option>30</option>}
          {results > 40 && <option>40</option>}
          {results > 50 && <option>50</option>}
          {results > 60 && <option>60</option>}
          {results > 70 && <option>70</option>}
          {results > 80 && <option>80</option>}
          {results > 90 && <option>90</option>}
          {results > 100 && <option>100</option>}
        </select>
      </div>
    </>
  );
};

export default Pagination;

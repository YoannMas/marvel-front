import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Pagination = ({ page, setPage }) => {
  return (
    <div className="pagination">
      {page > 1 ? (
        <button
          onClick={() => {
            setPage(page - 1);
            window.scrollTo(0, 0);
          }}
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            style={{ fontSize: 20, marginRight: 20 }}
          />
          Précedent
        </button>
      ) : (
        <div className="first-hidden"></div>
      )}
      <button
        onClick={() => {
          setPage(page + 1);
          window.scrollTo(0, 0);
        }}
      >
        Suivant
        <FontAwesomeIcon
          icon={faChevronRight}
          style={{ fontSize: 20, marginLeft: 20 }}
        />
      </button>
      )
    </div>
  );
};

export default Pagination;

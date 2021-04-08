import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import axios from "axios";

const Comics = ({ server, setAdded, setLoginModal, page, setPage }) => {
  const [data, setData] = useState();
  const [selector, setSelector] = useState("");
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [onChange, setOnChange] = useState(false);
  const [limit, setLimit] = useState(100);
  const [isActive, setIsActive] = useState("");
  const { id } = useParams();
  const skip = (page - 1) * limit;

  // Compel the automatic scoll top on page changing
  const handlePageChange = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fix a bug with component goes from /comics/:id to /comics
        if (!onChange) {
          setIsLoading(true);
        }
        // Define the right route in relation to the presence of comics ID
        if (id) {
          const response = await axios.get(`${server}/comics/${id}`);
          setData(response.data);
          setSelector("comics");
          setIsLoading(false);
        } else {
          const response = await axios.get(
            `${server}/comics?title=${title}&limit=${limit}&skip=${skip}`
          );
          setData(response.data);
          setSelector("results");
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    handlePageChange();
    fetchData();
  }, [title, id, limit, skip, server, onChange]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="container">
      <div className="title-search">
        <h2>{id ? `${data.name}'s comics` : "Marvel Comics List"}</h2>
        {/* Search bar on comics/:id not available */}
        {!id && (
          <input
            type="text"
            value={title}
            placeholder="search your comics..."
            onChange={(event) => {
              setTitle(event.target.value);
              setOnChange(true);
            }}
          />
        )}
      </div>
      {/* Limit on comics/:id not available */}
      {!id && (
        <div className="limit">
          <span>Number of comics per page:</span>
          <select
            defaultValue="100"
            onChange={(event) => {
              setLimit(event.target.value);
            }}
          >
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      )}
      {/* Switch between comics and results - 2 differentes key in characters obj and comics obj */}
      <div
        className="wrapper"
        style={{ height: data[selector].length < 5 && "100vh" }}
      >
        {/* Display the following message if no data return */}
        {data[selector].length === 0 && (
          <span style={{ color: "#fff" }}>No comics found</span>
        )}
        {data[selector].map((el) => {
          return (
            <Card
              el={el}
              key={el._id}
              server={server}
              setAdded={setAdded}
              setLoginModal={setLoginModal}
              isActive={isActive}
              setIsActive={setIsActive}
            />
          );
        })}
      </div>
      {!id && (
        <Pagination page={page} setPage={setPage} data={data} limit={limit} />
      )}
      )
    </div>
  );
};

export default Comics;

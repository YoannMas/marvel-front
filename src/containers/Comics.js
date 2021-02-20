import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import axios from "axios";

const Comics = ({ server }) => {
  const [data, setData] = useState();
  const [selector, setSelector] = useState("");
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [onChange, setOnChange] = useState(false);
  const [limit, setLimit] = useState(100);
  const [page, setPage] = useState(1);
  const { id } = useParams();
  const skip = (page - 1) * limit;
  console.log(isLoading);

  const handlePageChange = () => {
    window.scrollTo(0, 0);
  };

  const fetchData = async () => {
    try {
      // fix a bug with component goes from /comics/:id to /comics
      if (!onChange) {
        setIsLoading(true);
      }
      if (id) {
        const response = await axios.get(`${server}/comics/${id}`);
        setData(response.data);
        setSelector("comics");
        setIsLoading(false);
      } else {
        const response = await axios.get(`${server}/comics?title=${title}&limit=${limit}&skip=${skip}`);
        setData(response.data);
        setSelector("results");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    handlePageChange();
    fetchData();
  }, [title, id, limit, skip]);

  return (
    <div className="container">
      {isLoading ? (
        <div style={{ height: "100vh" }}>
          <span style={{ color: "#fff" }}>En cours de chargement...</span>
        </div>
      ) : (
        <>
          <div className="title-search">
            <h2>{id ? `${data.name}'s comics` : "Marvel Comics List"}</h2>
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
          <div className="wrapper" style={{ height: data[selector].length < 5 && "100vh" }}>
            {data[selector].length === 0 && <span style={{ color: "#fff" }}>No comics found</span>}
            {data[selector].map((el) => {
              return <Card el={el} key={el._id} />;
            })}
          </div>
          {!id && <Pagination page={page} setPage={setPage} data={data} limit={limit} />}
        </>
      )}
    </div>
  );
};

export default Comics;

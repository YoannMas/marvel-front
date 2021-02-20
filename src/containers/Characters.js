import { useState, useEffect } from "react";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
const axios = require("axios");

const Characters = ({ server, setAdded }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [name, setName] = useState("");
  const [limit, setLimit] = useState(100);
  const [page, setPage] = useState(1);
  const skip = (page - 1) * limit;

  const fetchData = async () => {
    try {
      const response = await axios.get(`${server}/characters?name=${name}&limit=${limit}&skip=${skip}`);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [name, limit, page]);

  return (
    <div className="container">
      {isLoading ? (
        <div style={{ height: "100vh" }}>
          <span>En cours de chargement...</span>
        </div>
      ) : (
        <>
          <div className="title-search">
            <h2>Marvel Characters List</h2>
            <input
              type="text"
              value={name}
              placeholder="search your character..."
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div className="limit">
            <span>Number of characters per page:</span>
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
          <div className="wrapper" style={{ height: data.results.length < 5 && "100vh" }}>
            {data.results.length === 0 && <span style={{ color: "#fff" }}>No character found</span>}
            {data.results.map((el) => {
              return <Card el={el} key={el._id} server={server} setAdded={setAdded} />;
            })}
          </div>
          <Pagination page={page} setPage={setPage} data={data} limit={limit} />
        </>
      )}
    </div>
  );
};

export default Characters;

import { useState, useEffect } from "react";
import Card from "../components/Card";
import Filters from "../components/Filters";
const axios = require("axios");

const Characters = ({ server }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [name, setName] = useState("");
  const [limit, setLimit] = useState(100);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${server}/characters?name=${name}&limit=${limit}`);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [name, limit]);

  return (
    <div className="container">
      {isLoading ? (
        <div style={{ height: "100vh" }}>
          <span>En cours de chargement...</span>
        </div>
      ) : (
        <>
          <Filters title="Number of characters per page :" setName={setName} name={name} setLimit={setLimit} />
          <div className="wrapper" style={{ height: data.results.length < 5 && "100vh" }}>
            {data.results.length === 0 && <span style={{ color: "#fff" }}>No character found</span>}
            {data.results.map((el) => {
              return <Card el={el} key={el._id} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Characters;

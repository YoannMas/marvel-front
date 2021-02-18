import { useState, useEffect } from "react";
import Card from "../components/Card";
const axios = require("axios");

const Characters = ({ server }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  const fetchData = async () => {
    const response = await axios.get(`${server}/characters`);
    setData(response.data);
    setIsLoading(false);
  };
  console.log(data);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      {isLoading ? (
        <div style={{ height: "100vh" }}>
          <span>En cours de chargement...</span>
        </div>
      ) : (
        <div className="wrapper">
          {data.results.map((el) => {
            return <Card el={el} key={el._id} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Characters;

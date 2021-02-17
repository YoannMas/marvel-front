import { useState, useEffect } from "react";
import CharacterCard from "../components/CharacterCard";
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
    <div className="characters">
      <div className="container">
        {isLoading ? (
          <span>En cours de chargement...</span>
        ) : (
          <div className="characters-wrapper">
            {data.results.map((el) => {
              return <CharacterCard el={el} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Characters;

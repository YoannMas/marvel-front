import { useState, useEffect } from "react";
import Card from "../components/Card";
const axios = require("axios");

const Characters = ({ server }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [name, setName] = useState("");

  const fetchData = async () => {
    const response = await axios.get(`${server}/characters?name=${name}`);
    setData(response.data);
    setIsLoading(false);
  };
  console.log(data);

  useEffect(() => {
    fetchData();
  }, [name]);

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

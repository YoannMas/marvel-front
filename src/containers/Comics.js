import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import axios from "axios";

const Comics = ({ server }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const { id } = useParams();
  console.log(id);

  const fetchData = async () => {
    if (id) {
      const response = await axios.get(`${server}/comics/${id}`);
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    } else {
      const response = await axios.get(`${server}/comics`);
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    }
  };

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

export default Comics;

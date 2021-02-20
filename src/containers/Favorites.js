import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import axios from "axios";

const Favorites = ({ server }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [remove, setRemove] = useState("");
  const { token } = useParams();
  console.log(data);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${server}/favorites/${token}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token, remove]);

  return (
    <div className="container">
      {isLoading ? (
        <div style={{ height: "100vh" }}>
          <span style={{ color: "#fff" }}>Loading...</span>
        </div>
      ) : (
        <div className="favorites">
          <h2>
            Welcome on your fav, <span style={{ color: "#f0151e" }}>{data.username}</span> !
          </h2>
          <div className="favorites-wrapper">
            <div>
              <h3>Favorites Characters</h3>
              <div className="overflow">
                {data.favorites.characters.map((el) => {
                  return <Card el={el} key={el._id} server={server} setRemove={setRemove} />;
                })}
              </div>
            </div>
            <div>
              <h3>Favorites Comics</h3>
              <div className="overflow">
                {data.favorites.comics.map((el) => {
                  return <Card el={el} key={el._id} server={server} setRemove={setRemove} />;
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;

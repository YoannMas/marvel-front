import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import axios from "axios";

const Favorites = ({ server }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [remove, setRemove] = useState("");
  const [isActive, setIsActive] = useState("");
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
          {data.favorites.characters.length === 0 && data.favorites.comics.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "60vh" }}>
              <span style={{ color: "#fff", fontSize: 20, marginBottom: 20, fontWeight: 600 }}>No favorites found yet.</span>
              <div>
                <span style={{ color: "grey", marginRight: 6 }}>
                  If you want to add some, search your favorites characters and comics and add them by clicking on the
                </span>
                <FontAwesomeIcon icon={faHeart} style={{ color: "#f0151e" }} />
              </div>
            </div>
          ) : (
            <div className="favorites-wrapper">
              <div>
                {data.favorites.characters.length > 0 && <h3>Favorites Characters</h3>}
                <div className="overflow">
                  {data.favorites.characters.map((el) => {
                    return (
                      <Card el={el} key={el._id} server={server} setRemove={setRemove} isActive={isActive} setIsActive={setIsActive} />
                    );
                  })}
                </div>
              </div>
              <div>
                {data.favorites.comics.length > 0 && <h3>Favorites Comics</h3>}
                <div className="overflow">
                  {data.favorites.comics.map((el) => {
                    return (
                      <Card el={el} key={el._id} server={server} setRemove={setRemove} isActive={isActive} setIsActive={setIsActive} />
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Favorites;

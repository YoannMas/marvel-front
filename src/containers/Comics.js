import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import axios from "axios";

const Comics = ({ server }) => {
  const [data, setData] = useState();
  const [selector, setSelector] = useState("");
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [onChange, setOnChange] = useState(false);
  const { id } = useParams();
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
        const response = await axios.get(`${server}/comics?title=${title}`);
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
  }, [title, id]);

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
          <div className="wrapper" style={{ height: data[selector].length < 5 && "100vh" }}>
            {data[selector].length === 0 && <span style={{ color: "#fff" }}>No character found</span>}
            {data[selector].map((el) => {
              return <Card el={el} key={el._id} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Comics;

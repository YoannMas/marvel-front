import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const Card = ({ el, server, setAdded }) => {
  // state for description
  const [display, setDisplay] = useState(false);
  let location = useLocation();
  const notFound = "image_not_available";

  const addToFavorites = async () => {
    try {
      if (location.pathname === "/") {
        const response = await axios.post(
          `${server}/user/favorites`,
          {
            token: Cookies.get("userToken"),
            characters: el,
          },
          {
            headers: {
              authorization: `Bearer ${Cookies.get("userToken")}`,
            },
          }
        );
        console.log(response.data);
      } else if (location.pathname.match("/comics")) {
        const response = await axios.post(
          `${server}/user/favorites`,
          {
            token: Cookies.get("userToken"),
            comics: el,
          },
          {
            headers: {
              authorization: `Bearer ${Cookies.get("userToken")}`,
            },
          }
        );
        console.log(response.data);
      }
      setAdded(true);
      setTimeout(() => {
        setAdded(false);
      }, 350);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      // display -verso- on click
      className="card"
      onClick={() => {
        setDisplay((display) => !display);
      }}
    >
      <img
        style={{ objectPosition: el.thumbnail.path.match(notFound) ? "left" : "top" }}
        src={`${el.thumbnail.path}.${el.thumbnail.extension}`}
        alt=""
      />
      <div>{location.pathname === "/" ? <span>{el.name}</span> : location.pathname.match("/comics") ? <span>{el.title}</span> : ""}</div>
      {display && (
        <div className="verso hidden">
          <span>{el.description ? el.description : "No description available for this character"}</span>
          {location.pathname === "/" && el.comics.length > 0 && <Link to={`/comics/${el._id}`}>See his comics</Link>}
          <FontAwesomeIcon className="heart" icon={faHeart} onClick={addToFavorites} />
        </div>
      )}
    </div>
  );
};

export default Card;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const Card = ({ el, server, setAdded, setLoginModal }) => {
  // state for description
  const [display, setDisplay] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let location = useLocation();
  const notFound = "image_not_available";

  const removeToFavorites = async () => {
    try {
    } catch (error) {}
  };

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
      if (error.response.data.message === "already in fav") {
        setErrorMessage("Already added in favorite");
        setDisplay(true);
      }
    }
  };

  return (
    <div
      // display -verso- on click
      className="card"
    >
      <img
        onClick={() => {
          setDisplay((display) => !display);
        }}
        style={{ objectPosition: el.thumbnail.path.match(notFound) ? "left" : "top" }}
        src={`${el.thumbnail.path}.${el.thumbnail.extension}`}
        alt=""
      />
      <div>{el.name ? el.name : el.title}</div>
      {display && (
        <div
          className="verso hidden"
          onClick={() => {
            setDisplay((display) => !display);
          }}
        >
          <span>{el.description ? el.description : "No description available for this character"}</span>
          {location.pathname === "/" && el.comics.length > 0 && <Link to={`/comics/${el._id}`}>See his comics</Link>}
          <span className="error" style={{ color: "#f0151cb7", fontWeight: 600 }}>
            {errorMessage}
          </span>
          {location.pathname.match("/favorites") ? (
            ""
          ) : (
            <FontAwesomeIcon
              className="heart"
              icon={faHeart}
              onClick={() => {
                if (Cookies.get("userToken")) {
                  if (location.patname.match("/favorites")) {
                    removeToFavorites();
                  } else {
                    addToFavorites();
                  }
                } else {
                  setLoginModal(true);
                }
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Card;

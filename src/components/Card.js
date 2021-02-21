import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const Card = ({ el, server, setAdded, setLoginModal, setRemove, isActive, setIsActive }) => {
  // state for description
  const [errorMessage, setErrorMessage] = useState("");
  let location = useLocation();
  const notFound = "image_not_available";

  // Remove a favorite
  const removeToFavorites = async () => {
    try {
      const response = await axios.delete(`${server}/favorites/remove/${el._id}`, {
        headers: {
          authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      });
      console.log(response.data);
      setRemove(el._id);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  // Add a favorite
  const addToFavorites = async () => {
    try {
      // Add characters
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
        // Add comics
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
      // Favorites button animation
      setAdded(true);
      setTimeout(() => {
        setAdded(false);
      }, 350);
    } catch (error) {
      console.log(error.message);
      // Error if the item target is already in fav list
      if (error.response.data.message === "already in fav") {
        setErrorMessage("Already added in favorite");
      }
    }
  };

  return (
    <div className="card">
      <img
        // display -verso- on click
        onClick={() => {
          setIsActive(el._id);
        }}
        // if item has picture display top, is it's the custom img not found display left in the purpose to show the text
        style={{ objectPosition: el.thumbnail.path.match(notFound) ? "left" : "top" }}
        src={`${el.thumbnail.path}.${el.thumbnail.extension}`}
        alt={el.name || el.title}
      />
      <div>{el.name ? el.name : el.title}</div>
      {isActive === el._id && (
        <div
          className="verso hidden"
          onClick={() => {
            // Diplay none on second click
            setIsActive("");
          }}
        >
          <span>{el.description ? el.description : "No description available for this character"}</span>
          {/* Display button "See his comics" if the item is a character and it has comics */}
          {(location.pathname === "/" || location.pathname.match("/favorites")) && (el.comics && el.comics.length) > 0 && (
            <Link to={`/comics/${el._id}`}>See his comics</Link>
          )}
          {/* Display error message */}
          <span className="error" style={{ color: "#f0151cb7", fontWeight: 600 }}>
            {errorMessage}
          </span>
          {/* Button for adding or removing an item in favorites */}
          <FontAwesomeIcon
            className="heart"
            icon={faHeart}
            onClick={() => {
              if (Cookies.get("userToken")) {
                if (location.pathname.match("/favorites")) {
                  removeToFavorites();
                } else {
                  addToFavorites();
                }
              } else {
                setLoginModal(true);
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Card;

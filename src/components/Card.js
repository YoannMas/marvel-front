import { useLocation, Link } from "react-router-dom";
import { useState } from "react";

const Card = ({ el }) => {
  // state for description
  const [display, setDisplay] = useState(false);
  const [target, setTarget] = useState("");
  let location = useLocation();
  const notFound = "image_not_available";

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
      <div>{location.pathname === "/" ? <span>{el.name}</span> : location.pathname.match(location) ? <span>{el.title}</span> : ""}</div>
      {display && (
        <div className="verso hidden">
          <span>{el.description ? el.description : "No description available for this character"}</span>
          {location.pathname === "/" && el.comics.length > 0 && <Link to={`/comics/${el._id}`}>See his comics</Link>}
        </div>
      )}
    </div>
  );
};

export default Card;

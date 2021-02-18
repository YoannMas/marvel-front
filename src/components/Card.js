import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
const Card = ({ el }) => {
  const [display, setDisplay] = useState(false);
  let location = useLocation();
  const notFound = "image_not_available";
  return (
    <div
      className="card"
      onClick={() => {
        setDisplay((display) => !display);
      }}
    >
      <img
        style={{ objectPosition: el.thumbnail.path.match(notFound) ? "left" : "center" }}
        src={`${el.thumbnail.path}.${el.thumbnail.extension}`}
        alt=""
      />
      <div>{location.pathname === "/" ? <span>{el.name}</span> : location.pathname === "/comics" ? <span>{el.title}</span> : ""}</div>
      {display && (
        <div className="verso hidden">
          <span>{el.description ? el.description : "No description available for this character"}</span>
          <Link to={`/comics/${el._id}`}>See his comics</Link>
        </div>
      )}
    </div>
  );
};

export default Card;

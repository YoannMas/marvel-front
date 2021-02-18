import { useLocation } from "react-router-dom";

const Card = ({ el }) => {
  let location = useLocation();
  const notFound = "image_not_available";
  return (
    <div className="card">
      {el.thumbnail.path.match(notFound) ? (
        <div className="no-picture">Aucune image trouvée 😢</div>
      ) : (
        <img src={`${el.thumbnail.path}.${el.thumbnail.extension}`} alt="" />
      )}
      <div>
        {location.pathname === "/" ? <span>{el.name}</span> : location.pathname === "/comics" ? <span>{el.title}</span> : ""}
        <span>{el.description}</span>
      </div>
    </div>
  );
};

export default Card;

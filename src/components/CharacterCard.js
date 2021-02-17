const CharacterCard = ({ el }) => {
  return (
    <div className="character-card">
      <img src={el.thumbnail.path} alt="" />
    </div>
  );
};

export default CharacterCard;

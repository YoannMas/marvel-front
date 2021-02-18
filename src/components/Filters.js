const Filters = ({ title, name, setName, setLimit }) => {
  return (
    <div className="filters">
      <div className="title-search">
        <h2>Marvel Characters List</h2>
        <input
          type="text"
          value={name}
          placeholder="search your character..."
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </div>
      <div className="limit">
        <span>{title}</span>
        <select
          onChange={(event) => {
            setLimit(event.target.value);
          }}
        >
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100" selected>
            100
          </option>
        </select>
      </div>
    </div>
  );
};

export default Filters;

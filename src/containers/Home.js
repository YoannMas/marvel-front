import heroVideo from "../assets/marvel_video.mp4";

const Home = () => {
  return (
    <div className="home">
      <video
        autoPlay
        loop
        muted
        style={{
          width: "100%",
          left: "0",
          top: "80px",
        }}
      >
        <source src={heroVideo} />
      </video>
    </div>
  );
};

export default Home;

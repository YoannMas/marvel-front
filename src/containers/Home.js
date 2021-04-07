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
          position: "fixed",
        }}
      >
        <source src={heroVideo} />
      </video>
    </div>
  );
};

export default Home;

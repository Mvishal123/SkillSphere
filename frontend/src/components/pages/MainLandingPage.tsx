// import smallboy from "../../Media/Landing/smallboy.jpg";
import Hero from "../Hero";
import Companies from "../Companies";

const MainLandingPage = () => {
  return (
    <main>
      <div
        style={{
          backgroundImage: `url(https://img.freepik.com/free-vector/blue-pink-halftone-background_53876-99004.jpg?size=626&ext=jpg&ga=GA1.1.982947543.1694245623&semt=ais)`,
        }}
        className="relative bg-cover bg-no-repeat h-[88vh] w-full"
      >
        <Hero />
      </div>
      <Companies />
    </main>
  );
};

export default MainLandingPage;

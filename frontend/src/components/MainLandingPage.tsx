// import smallboy from "../../Media/Landing/smallboy.jpg";
import Hero from "./admin/Hero";
import Companies from "./admin/Companies";

const MainLandingPage = () => {
  return (
    <main className="">
      <div className="relative bg-cover bg-no-repeat h-[88vh] w-full bg-gradient-to-t from-fuchsia-100 white">
        <Hero />
      </div>
      <Companies />
    </main>
  );
};

export default MainLandingPage;

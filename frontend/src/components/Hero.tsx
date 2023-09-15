import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
const Hero = () => {
  const navigate = useNavigate();
  return (
    <main className="container py-24 md:py-18">
      <section className="md:px-20 md:py-16 bg-cover bg-center bg-no-repeat">
        <h1 className="text-6xl font-extrabold text-center">
          <span>The best platform to</span> <br />
          <span className="text-[#7b2cbf]">learn </span>and teach
        </h1>
        <div className="pt-16 flex flex-col items-center gap-3">
          <div>
            <span className="text-2xl font-ui font-semi-bold">Get started Now</span>
          </div>
          <div className="space-x-4">
            <Button className="bg-[#5a189a]" size="lg" onClick={() => navigate("/admin/signup")}>Teacher</Button>
            <Button className="hover:bg-[#5a189a]" size="lg">Student</Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Hero;

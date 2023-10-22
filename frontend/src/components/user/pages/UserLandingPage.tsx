import CourseSlider from "../CourseSlider";
import Hero from "../Hero";
// import { hero } from "../../../assets/index.js";
function UserLandingPage() {
  return (
    <div>
      <section>
        <Hero />
      </section>
      <section className="mt-12">
        <h1 className="text-3xl font-bold container1 tracking-tight">Popular courses</h1>
        <CourseSlider />
      </section>
    </div>
  );
}

export default UserLandingPage;

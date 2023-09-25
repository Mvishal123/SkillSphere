// import Companies from "../admin/Companies";

function Hero() {
  return (
    <div className="container1 bg-gradient-to-t from-fuchsia-100 white py-12 rounded-lg flex lg:flex-row flex-col justify-between">
      <div className="">
        <h1 className="font-poppins text-4xl font-extrabold tracking-tight">
          Dont just browse the web <br />
          learn to design it
        </h1>
        <p className="text-slate-600 mt-2">
          spend around 30 minutes a day skyrocket your career
        </p>
      </div>
      <div className="flex gap-10 flex-wrap mt-10 lg:m-0 lg:justify-center justify-start">
        <div className="flex items-center">
          <span className="herostats">200,000+</span>
          <span className="font-medium">students</span>
        </div>
        <div className="flex items-center">
          <span className="herostats">8000+</span>
          <span className="font-medium">Courses</span>
        </div>
        <div className="flex items-center">
          <span className="herostats">60+</span>
          <span className="font-medium">Companies</span>
        </div>
      </div>
    </div>
  );
}

export default Hero;

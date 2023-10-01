import Typed from "react-typed";

const TypeAnimationStudent= () => {
  return (
    <div>
      <Typed
        strings={[
            "Students are the architects of tomorrow's world.",
            "Students are the torchbearers of knowledge and innovation.",
            "Students are the seeds of change in society.",
            "Students are the canvas on which the future is painted.",
            "Students are the dreamers who shape our future reality."
        ]}
        typeSpeed={50}
        backSpeed={20}
        loop
        className="text-2xl font-bold md:font-extrabold md:text-4xl"
      />
    </div>
  );
};

export default TypeAnimationStudent;

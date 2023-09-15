import Typed from "react-typed";

const TypeAnimationTeacher = () => {
  return (
    <div>
      <Typed
        strings={[
            "Teachers are Inspiring minds, shaping futures.",
            "Teachers are Guiding lights of knowledge.",
            "Teachers are Mentors of tomorrow's leaders.",
            "Teachers are Dedicated to learning excellence.",
            "Teachers are Fueling curiosity and growth.",
        ]}
        typeSpeed={50}
        backSpeed={20}
        loop
        className="text-2xl font-bold md:font-extrabold md:text-4xl"
      />
    </div>
  );
};

export default TypeAnimationTeacher;

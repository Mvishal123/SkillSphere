const Companies = () => {
  return (
    <section className=" px-3 md:container pt-12">
      <h1 className="text-center text-3xl font-medium">
        We collaborate with industry leaders
      </h1>
      <div className="grid grid-cols-5 gap-8 px-20 py-12 place-items-center">
        <img
          src="https://cdn-icons-png.flaticon.com/128/731/731970.png"
          alt=""
          className="h-10 sm:h-20 hover:scale-110"
        />
        <img
          src="https://cdn-icons-png.flaticon.com/128/6033/6033713.png"
          alt=""
          className="h-10 sm:h-20 hover:scale-110"
        />
        <img
          src="https://cdn-icons-png.flaticon.com/128/1724/1724587.png"
          alt=""
          className="h-10 sm:h-20 hover:scale-110"
        />
        <img
          src="https://cdn-icons-png.flaticon.com/128/10464/10464582.png"
          alt=""
          className="h-10 sm:h-20 hover:scale-110"
        />
        <img
          src="https://cdn-icons-png.flaticon.com/128/731/731985.png"
          alt=""
          className="h-10 sm:h-20 hover:scale-110"
        />
      </div>
    </section>
  );
};

export default Companies;

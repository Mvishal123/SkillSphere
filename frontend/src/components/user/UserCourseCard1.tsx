import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import { Rating } from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";

function UserCourseCard1() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const init = async () => {
      const res = await axios.get(`${BASE_URL}/user/courses`);
      if (res) {
        let courses = res.data.courses;
        if (courses.length > 10) {
          courses = courses.slice(0, 10);
        }
        setCourses(courses);
      }
    };
    init();
  }, []);

  const slideRight = () => {
    const scroll = document.getElementById("slider");
    if (scroll) {
      scroll.scrollLeft += 550;
    }
  };

  const slideLeft = () => {
    const scroll = document.getElementById("slider");

    if (scroll) {
      scroll.scrollLeft -= 550;
    }
  };

  if (courses.length === 0) return <div>loading...</div>;

  return (
    <main className=" container relative flex items-center">
      <div className="rounded-full hover:opacity-100 opacity-50 ">
        <ChevronLeft size={40} id="slideLeft" onClick={slideLeft} />
      </div>
      <div
        className="flex overflow-x-scroll scroll-smooth scrollbar-none container"
        id="slider"
      >
        {courses.map((course, i) => {
          return (
            <div className="px-2 pt-2 min-w-[300px]" key={i}>
              <img
                src="https://wallpaper.dog/large/20525131.jpg"
                alt=""
                className="h-38 w-66"
              />
              <div>
                <h1 className="text-lg font-bold pt-1">{course.title}</h1>
                <span className="text-slate-500">{course.teacher}</span>
                <div className="flex items-center justify-between py-2 ">
                  <span className="text-lg font-bold">{course.price}</span>
                  <div className="flex items-center">
                    <Rating readOnly></Rating>
                    <span className="text-sm px-2 text-slate-500">(0)</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="rounded-full hover:opacity-100 opacity-50 scroll">
        <ChevronRight size={40} id="slideRight" onClick={slideRight} />
      </div>
    </main>
  );
}

export default UserCourseCard1;

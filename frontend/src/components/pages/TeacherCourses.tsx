import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import CourseCard from "../ui/CourseCard";

interface CourseDetails {
  title: string;
  description: string;
  price: string;
  image: string;
  teacher: string;
}

type courseData = CourseDetails[]

const TeacherCourses = () => {
  const [courses, setCourses] = useState<courseData>([]);
  useEffect(() => {
    const init = async () => {
      const res = await axios.get(`${BASE_URL}/admin/courses`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (res) {
        setCourses(res.data.courses);
      }
    };

    init();
  }, []);

  if (!courses) {
    return <></>;
  }

  return (
    <main className="container">
      <h1 className="py-12 text-center text-4xl font-extrabold">My courses</h1>
      <div className="grid lg:grid-cols-4 gap-4">
        {courses.map((course) => {
          return <CourseCard title={course.title} description={course.description} price={course.price} teacher={course.teacher} image={course.image}/>;
        })}
      </div>
    </main>
  );
};

export default TeacherCourses;

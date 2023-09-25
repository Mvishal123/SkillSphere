import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config";
import CourseCardTeacher from "../CourseCardTeacher"
import { useRecoilValue } from "recoil";
import { adminState } from "@/store/atoms/admin";
interface CourseDetails {
  title: string;
  description: string;
  price: string;
  image: string;
  teacher: string;
  _id:string;
}

type courseData = CourseDetails[]

const TeacherCourses = () => {
  const [courses, setCourses] = useState<courseData>([]);
  const access = useRecoilValue(adminState);
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
  if(!access.username){
    return<><h1>Unauthorized</h1></>
  }

  if (!courses) {
    return <></>;
  }

  return (
    <main className="container flex flex-col items-center">
      <h1 className="py-12 text-center text-4xl font-extrabold">My courses</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 place-items-center">
        {courses.map((course) => {
          return <CourseCardTeacher id={course._id} title={course.title} description={course.description} price={course.price} teacher={course.teacher} image={course.image}/>;
        })}
      </div>
    </main>
  );
};

export default TeacherCourses;

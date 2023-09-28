import { useEffect, useState} from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import UserCourseCard1 from "./UserCourseCard1";
function CourseSlider() {
    const [courses, setCourses] = useState([])
  useEffect(() => {
    const init = async () => {
      const res = await axios.get(`${BASE_URL}/user/courses`);
      if(res){
        setCourses(res.data.courses);
      }
    };
    init();
  }, []);
  return <div>
    <UserCourseCard1 />
  </div>;
}

export default CourseSlider;

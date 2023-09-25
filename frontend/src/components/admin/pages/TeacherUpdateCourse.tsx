import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../config";
import CourseCard from "./CourseCard";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";
import { useRecoilValue } from "recoil";
import { adminState } from "@/store/atoms/admin";

interface CardProps {
  title: string;
  description: string;
  price: string;
  teacher: string;
  image: string;
}

const TeacherUpdateCourse = () => {
  const { courseId } = useParams();

  const [course, setCourse] = useState<CardProps | null>(null);
  const [title, setTitle] = useState(course?.title);
  const [description, setDescription] = useState(course?.description);
  const [price, setPrice] = useState(course?.price);
  const [teacher, setTeacher] = useState(course?.teacher);
  const [image, setImage] = useState(
    "https://wallpaper.dog/large/20525131.jpg"
  );
  const access = useRecoilValue(adminState);

  useEffect(() => {
    const init = async () => {
      const res = await axios.get(`${BASE_URL}/admin/courses/${courseId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (res) {
        const c = res.data;
        setCourse(c.course);
        setTitle(c.course.title);
        setPrice(c.course.price);
        setDescription(c.course.description);
        setImage(String(c.course.image));
        setTeacher(c.course.teacher);
      }
    };
    init().then(() => console.log(course));
  }, []);

  if (!access.username == null) {
    return (
      <>
        <h1 className="text-4xl">Unauthorized</h1>
      </>
    );
  } else {
    if (!course) {
      return <>HIIII</>;
    }

    return (
      <div className="relative">
        <div className="hidden lg:block relative text-4xl font-extrabold z-20 p-20 tracking-tighter text-slate-800">
          {title}
        </div>
        <main className="bg-gradient-to-b from-slate-50 to-purple-700 h-[30vh] grid grid-cols-1 lg:grid-cols-2 absolute top-0 ">
          <div className="px-12 py-10 relative lg:top-52">
            <div className="px-12 border pb-10 rounded-lg shadow-2xl bg-slate-50">
              <h1 className="py-12 text-3xl font-bold text-center">
                Add course details
              </h1>
              <div className="py-2">
                <label htmlFor="title">Title</label>
                <Input
                  id="title"
                  className=" border-slate-700 font-medium"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="py-2">
                <label htmlFor="teacher">Teacher</label>
                <Input
                  id="teacher"
                  className="border-slate-700 font-medium"
                  value={teacher}
                  onChange={(e) => setTeacher(e.target.value)}
                />
              </div>
              <div className="py-2">
                <label htmlFor="price">Price</label>
                <Input
                  id="price"
                  className=" border-slate-700 font-medium"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="py-2">
                <label htmlFor="description">Description</label>
                <Textarea
                  id="description"
                  className=" border-slate-700 font-medium"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="image">Image</label>
                <Input
                  type="file"
                  id="image"
                  className="border-slate-700 font-medium"
                  // value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
              <div className="w-full flex justify-center flex-col items-center pt-6">
                <Button
                  onClick={async () => {
                    await axios.put(
                      `${BASE_URL}/admin/courses/${courseId}`,
                      { title, description, image, price, teacher },
                      {
                        headers: {
                          Authorization:
                            "Bearer " + localStorage.getItem("token"),
                        },
                      }
                    );
                    alert("Course updated successfully");
                  }}
                >
                  Update course
                </Button>
              </div>
            </div>
          </div>
          <div className="relative px-12 lg:px-40 py-12 order-first lg:order-last">
            <CourseCard
              title={title}
              description={description}
              price={price}
              teacher={teacher}
              image={image}
            />
          </div>
        </main>
      </div>
    );
  }
};

export default TeacherUpdateCourse;

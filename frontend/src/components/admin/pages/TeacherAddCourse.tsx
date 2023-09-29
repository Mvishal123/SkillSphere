import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";
import { BASE_URL } from "@/components/config";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { adminState } from "@/store/atoms/admin";

const TeacherAddCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [teacher, setTeacher] = useState("");
  const [image, setImage] = useState(
    "https://wallpaper.dog/large/20525131.jpg"
  );
  const access = useRecoilValue(adminState);

  if (access.username) {
    return (
      <main className="grid grid-cols-1 gap-2 sm:grid-cols-2 place-items-center bg-gradient-to-t from-fuchsia-100 white mt-10">
        <div className="px-12 border pb-10 rounded-lg shadow-2xl bg-slate-50">
          <h1 className="py-12 text-3xl font-bold text-center">
            Add course details
          </h1>
          <div className="py-2">
            <label htmlFor="title">Title</label>
            <Input
              id="title"
              placeholder="course title"
              className="w-80 border-slate-700"
              onChange={(e) => setTitle(e.target.value)}
            ></Input>
          </div>
          <div className="py-2">
            <label htmlFor="title">Teacher</label>
            <Input
              id="teacher"
              placeholder="Teacher name"
              className="border-slate-700"
              onChange={(e) => setTeacher(e.target.value)}
            ></Input>
          </div>
          <div className="py-2">
            <label htmlFor="price">Price</label>
            <Input
              id="price"
              placeholder="course price"
              className=" border-slate-700"
              onChange={(e) => setPrice(e.target.value)}
            ></Input>
          </div>
          <div className="py-2">
            <label htmlFor="description">Description</label>
            <Textarea
              id="description"
              placeholder="course description here"
              className=" border-slate-700"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="">image</label>
            <Input type="file" className="border-slate-700"></Input>
          </div>
          <div className="w-full flex justify-center flex-col items-center pt-6">
            <Button
              onClick={async () => {
                const data = {
                  title,
                  description,
                  image,
                  price,
                  teacher,
                };
                await axios.post(`http://localhost:3000/admin/courses`, data, {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                });

                alert("Course added successfully");
                window.location.reload();
              }}
            >
              Add course
            </Button>
          </div>
        </div>

        <div className="max-w-[550px] min-w-[280px] w-[350px]">
          <CourseCard
            title={title}
            description={description}
            price={price}
            teacher={teacher}
            image={image}
          />
        </div>
      </main>
    );
  } else {
    return <>Unauthorized</>;
  }
};

export default TeacherAddCourse;

import { useState } from "react";
import CourseCard from "../ui/CourseCard";

const TeacherAddCourse = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [description, setDescription] = useState("");
    const [teacher, setTeacher] = useState("");

    return(
        <main>
            <CourseCard />
        </main>
    )
}

export default TeacherAddCourse;
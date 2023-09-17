import { Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Header from "./components/Header";
import MainLandingPage from "./components/pages/MainLandingPage";
import TeacherLandingPage from "./components/pages/TeacherLandingPage";
import TeacherAddCourse from "./components/pages/TeacherAddCourse";
import TeacherCourses from "./components/pages/TeacherCourses";
import TeacherUpdateCourse from "./components/pages/TeacherUpdateCourse";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<MainLandingPage />} />
        <Route path="/admin" element={<TeacherLandingPage />} />
        <Route path="/admin/signup" element={<SignUp />} />
        <Route path="/admin/signin" element={<SignIn />} />
        <Route path="/admin/addcourse" element={<TeacherAddCourse />} />
        <Route path="/admin/courses" element={< TeacherCourses/>} />
        <Route path="/admin/courses/:courseId" element={< TeacherUpdateCourse/>} />
      </Routes>
    </div>
  );
};

export default App;

import { Routes, Route } from "react-router-dom";
import SignUp from "./components/admin/SignUp";
import SignIn from "./components/admin/SignIn";
import Header from "./components/Header";
import MainLandingPage from "./components/MainLandingPage";
import TeacherLandingPage from "./components/admin/pages/TeacherLandingPage";
import TeacherAddCourse from "./components/admin/pages/TeacherAddCourse";
import TeacherCourses from "./components/admin/pages/TeacherCourses";
import TeacherUpdateCourse from "./components/admin/pages/TeacherUpdateCourse";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "./components/config";
import { useSetRecoilState } from "recoil";
import { adminState } from "./store/atoms/admin";
import UserLandingPage from "./components/user/pages/UserLandingPage";
import { HeaderType } from "./store/atoms/header";

const App = () => {
  const setAdmin = useSetRecoilState(adminState);
  const setHeaderState = useSetRecoilState(HeaderType);
  useEffect(() => {
    const init = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/admin/me`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        if (res) {
          setAdmin({
            username: res.data.id,
            isLoading: false,
          });
          setHeaderState({
            type: "signed",
          });
        }
      } catch (error) {
        setAdmin({
          username: null,
          isLoading: false,
        });
      }
    };
    init();
  }, []);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<MainLandingPage />} />
        <Route path="/admin" element={<TeacherLandingPage />} />
        <Route path="/admin/signup" element={<SignUp />} />
        <Route path="/admin/signin" element={<SignIn />} />
        <Route path="/admin/addcourse" element={<TeacherAddCourse />} />
        <Route path="/admin/courses" element={<TeacherCourses />} />
        <Route
          path="/admin/courses/:courseId"
          element={<TeacherUpdateCourse />}
        />
        <Route path="/user" element={<UserLandingPage />} />
      </Routes>
    </div>
  );
};

export default App;

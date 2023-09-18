import { useEffect, useState } from "react";
import HeaderSheet from "../ui/HeaderSheet";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Sun, Moon, Loader } from "lucide-react";
import ProfileButton from "../ui/ProfileButton";
import axios from "axios";
import { BASE_URL } from "../config";
import { useSetRecoilState } from "recoil";
import { adminState } from "../../store/atoms/admin";

const TeacherSignedHeader = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("dark");
  const setUser = useSetRecoilState(adminState);
  const [username, setUsername] = useState("")
  useEffect(() => {
    const init = async () => {
      const res = await axios.get(`${BASE_URL}/admin/getname`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      if(res){
        setUsername(res.data.username)
        console.log(username);
        
      } 
    };
    init();
  }, []);

  return (
    <header className="px-4 md:px-6 lg:px-8 py-5  flex justify-between items-center bg-transparent">
      <HeaderSheet mode={mode} setMode={setMode} />
      <h1
        className="text-4xl font-extrabold text-slate-800 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Skill<span className="text-[#7b2cbf]">Sphere</span>
      </h1>
      <div className="hidden lg:flex lg:gap-12 md:gap-4 gap-1">
        <Button variant={"ghost"}  onClick={() => navigate("/admin")}>
          Home
        </Button>
        <Button variant={"ghost"}  onClick={() => navigate("/admin/addcourse")}>
          Add courses
        </Button>
        <Button variant={"ghost"} onClick={() => navigate("/admin/courses")}>My course</Button>
        <Button variant={"ghost"} onClick={() => navigate("/admin/dashboard")}>Dashboard</Button>
      </div>
      <div className="lg:flex gap-2 hidden">
        <div className="mr-12">
          <Button
            onClick={() => {
              mode === "dark" ? setMode("light") : setMode("dark");
            }}
            variant={"ghost"}
          >
            {mode === "dark" ? <Moon /> : <Sun />}
          </Button>
        </div>
        <div className="hidden lg:flex space-x-6">
          <div className="flex flex-col">
            <span className="font-bold">Welcome!</span>
            <span className="font-bold text-lg text-slate-800">{username}</span>
          </div>
          <Button
            size="lg"
            className="bg-[#7b2cbf] md:w-20 lg:w-full"
            onClick={() => {
              localStorage.setItem("token", "");
              setUser({
                isLoading: false,
                username: null,
              });
              navigate("/admin/signin");
            }}
          >
            Log out
          </Button>
        </div>
      </div>
      <ProfileButton />
    </header>
  );
};

export default TeacherSignedHeader;

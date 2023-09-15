// import { UserState } from "../store/atoms/user.ts";
import { Button } from "./ui/button";
import { Sun, Moon} from "lucide-react";
import { useState } from "react";
import ProfileButton from "./ui/ProfileButton.tsx";
import HeaderSheet from "./ui/HeaderSheet.tsx";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [mode, setMode] = useState("dark");
  const navigate = useNavigate();

  return (
    <header className="px-4 md:px-6 lg:px-8 py-5  flex justify-between items-center bg-transparent">
      <HeaderSheet mode={mode} setMode={setMode} />
      <h1
        className="text-4xl font-extrabold text-slate-800 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Skill<span className="text-[#7b2cbf]">Sphere</span>
      </h1>
      <div className="hidden lg:flex lg:gap-12 gap-1">
        <Button variant={"ghost"} className="">
          About
        </Button>
        <Button variant={"ghost"}>Why us</Button>
        <Button variant={"ghost"}>Contact</Button>
      </div>
      <div className="lg:flex gap-2 hidden">
        <div className="">
          <Button
            onClick={() => {
              mode === "dark" ? setMode("light") : setMode("dark");
            }}
            variant={"ghost"}
          >
            {mode === "dark" ? <Moon /> : <Sun />}
          </Button>
        </div>
        <div className="hidden lg:block space-x-2">
          <Button
            variant={"ghost"}
            className="hover:bg-[#7b2cbf] hover:text-white"
            size="lg"
            onClick={() => navigate("/admin/signup")}
          >
            Teacher
          </Button>
          <Button size="lg" className="bg-[#7b2cbf]">
            Student
          </Button>
        </div>
      </div>
      <ProfileButton />
    </header>
  );
};

export default Header;

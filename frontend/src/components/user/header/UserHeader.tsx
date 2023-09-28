import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sun, Moon, ChevronDownIcon } from "lucide-react";
// import ProfileButton from "@/components/admin/ProfileButton";
import Searchbar from "../Searchbar";
import Cart from "../Cart";
import ProfileButton from "../ProfileButton";


function UserHeader() {
  const navigate = useNavigate();
  const mode = "dark"; // change it to useRecoilValue later
  return (
    <header className="px-4 md:px-6 lg:px-8 py-5 flex justify-between items-center bg-transparent">
      {/* Logo */}
      <h1
        className="text-4xl font-extrabold text-slate-800 cursor-pointer"
        onClick={() => navigate("/user")}
      >
        Skill<span className="text-[#7b2cbf]">Sphere</span>
      </h1>

      {/* section 1 */}
      <div className="hidden sm:block">
        <Searchbar />
      </div>

      {/* Section 2 */}
      <div className="hidden sm:flex justify-center items-center">
        <Button variant={"ghost"} className="group">
          <span>Learn</span>
          <span className="group-hover:rotate-180">
            <ChevronDownIcon />
          </span>
        </Button>
        <Button variant={"ghost"}>About</Button>
      </div>

      {/* university */}
      <div className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 p-[2.5px] rounded-full w-[200px] gap-6 md:block hidden">
        <div className="bg-white rounded-full px-2 hover:bg-transparent hover:text-white font-bold cursor-pointer text-center">
          <p>SkillSphere University</p>
        </div>
      </div>

      <div className="sm:flex items-center gap-2 hidden">
        <Cart />
        <Button
          // onClick={() => {
          // mode === "dark" ? setMode("light") : setMode("dark");
          // }}
          variant={"ghost"}
        >
          {mode === "dark" ? <Moon /> : <Sun />}
        </Button>
      </div>

      {/* Profile button */}
      <div className="flex justify-center items-center">
        <ProfileButton />
      </div>
    </header>
  );
}

export default UserHeader;

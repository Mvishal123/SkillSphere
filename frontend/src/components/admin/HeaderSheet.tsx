import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Menu, Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { useRecoilValue } from "recoil";
import { adminState } from "@/store/atoms/admin";
import { useNavigate } from "react-router-dom";

interface props {
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<any>>;
}
const HeaderSheet = (props: props) => {
  const admin = useRecoilValue(adminState);
  const navigate = useNavigate();

  return (
    <div className="lg:hidden flex">
      <Sheet>
        <SheetTrigger>
          <Menu className="w-12 h-10" />
        </SheetTrigger>
        <SheetContent side={"left"} className="w-[300px]">
          <div className="mb-10">
            <h1 className="text-5xl text-center font-extrabold">SkillShare</h1>
          </div>
          <div >
            {!admin.username ? (
              <div className="flex flex-col gap-2">
                <Button variant={"ghost"}>About</Button>
                <Button variant={"ghost"}>Why us</Button>
                <Button variant={"ghost"}>Courses</Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Button variant={"ghost"} onClick={() => navigate("/admin")}>Home</Button>
                <Button variant={"ghost"} onClick={() => navigate("/admin/addcourse")}>Add course</Button>
                <Button variant={"ghost"} onClick={() => navigate("/admin/courses")}>Courses</Button>
                <Button variant={"ghost"} onClick={() => navigate("/admin/dashboard")}>Dashboard</Button>
              </div>
            )}
          </div>
          <div className="w-full mt-10">
            <Button
              className="w-full"
              onClick={() => {
                props.mode === "dark"
                  ? props.setMode("light")
                  : props.setMode("dark");
              }}
              variant={"outline"}
            >
              {props.mode === "dark" ? (
                <Moon color="black" />
              ) : (
                <Sun color="black" />
              )}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default HeaderSheet;

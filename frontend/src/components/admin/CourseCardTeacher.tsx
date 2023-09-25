// import Rating from "@mui/material/Rating";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

interface CardProps {
  title: string;
  description: string;
  price: string;
  teacher: string;
  image: string;
  id: string;
}

const CourseCard = (props: CardProps) => {
    const navigate = useNavigate();
  return (
    <main className="px-2 pt-2 rounded-lg border shadow-2xl bg-slate-50">
      <img
        src="https://wallpaper.dog/large/20525131.jpg"
        alt=""
        className="h-38 w-66"
      />
      <div>
        <h1 className="text-lg font-bold pt-1">
          {props.title ? props.title : "CourseName"}
        </h1>
        <span className="text-slate-500">
          {props.teacher ? props.teacher : "Teacher name or organization"}
        </span>
        <div className="flex items-center justify-between py-2">
          <span className="text-2xl font-bold">
            ${props.price ? props.price : "price"}
          </span>
          <div className="flex items-center justify-center">
            {/* <Rating readOnly></Rating>
            <span className="text-sm px-2 text-slate-500">(0)</span> */}
            <Button onClick={() => navigate(`${props.id}`)} className=""><span className="hidden md:block">edit course</span><span className="md:hidden">edit</span></Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CourseCard;

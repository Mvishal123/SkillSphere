import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config";
import { spawn } from "child_process";
// import { useEffect } from "react";

const TeacherLandingPage = () => {

  const [adminName, setAdminName] = useState("");
  useEffect(() => {
    const init = async () => {
      const res = await axios.get(`${BASE_URL}/admin/getname`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      if(res){
        setAdminName(res.data.username)        
      } 
    };
    init();
  }, []);

  const navigate = useNavigate();
  return (
    <main className="py-12 bg-gradient-to-t from-fuchsia-100 white h-[88vh]">
      <h1 className="text-center font-bold text-3xl">
        Welcome <span className="text-[#7b2cbf]">{adminName}!</span>
      </h1>
      <div className="flex flex-col items-center my-20">
        <div className="text-center">
          <h2 className="text-7xl font-ui font-extrabold tracking-tighter">
            Start teaching
          </h2>
          <span className="text-3xl font-ui text-slate-600 tracking-tight">
            over 100,000's of students online
          </span>
        </div>
        <Button onClick={() => {
          navigate("/admin/addcourse")
        }}className="bg-[#7b2cbf] mt-12" size="lg">
          {adminName ? <span>Add course</span> : <span>Get Started</span>}
        </Button>
      </div>
    </main>
  );
};

export default TeacherLandingPage;

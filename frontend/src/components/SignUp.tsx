import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { UserState } from "../store/atoms/user.ts";

const SignUp = () => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(UserState);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="w-full h-[90vh] flex justify-center items-center">
      <div className="w-[20rem]">
        <h1 className="text-center pt-4 font-sans text-2xl">
          Create an account
        </h1>
        <div className="flex flex-col px-4 pt-6">
          <label htmlFor="username">username</label>
          <input
            className=" bg-gray-100 w-72 rounded-md h-8 p-2 border border-red-600  focus:outline-pink-800"
            type="text"
            id="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col px-4 pt-2">
          <div className="flex justify-between mt-5">
            <label htmlFor="password">password</label>
            <a className="text-purple-950" href="#">
              forgot password?
            </a>
          </div>
          <input
            className=" bg-gray-100 w-72 rounded-md h-8 p-2 border border-red-600  focus:outline-pink-800"
            type="password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center">
          <div className="mt-10 text-center text-purple-950">
            <Link className="text-sm" to="/admin/signin">
              Already have an account?
            </Link>
            <button
              className="w-72 bg-red-600 rounded-md text-white px-3 py-1"
              onClick={async () => {
                const res = await axios.post(
                  "http://localhost:3000/admin/signup",
                  {
                    username,
                    password,
                  }
                );

                const data = res.data;
                localStorage.setItem("token", data.token);
                if (username) {
                  setUser({
                    isLoading: false,
                    username: username
                  });
                }
                navigate("/");
              }}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

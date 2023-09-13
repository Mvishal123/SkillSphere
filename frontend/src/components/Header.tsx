// import { UserState } from "../store/atoms/user.ts";
import { useRecoilState, useRecoilValue } from "recoil";
import { userIsLoading } from "../store/selectors/userIsLoading.ts";
import { username } from "../store/selectors/username.ts";
import {Button} from "./ui/button"

const Header = () => {
  // const [userState, setUserState] = useRecoilState(UserState);
  const isLoading = useRecoilValue(userIsLoading);
  const userSigned = useRecoilValue(username);

  if (!isLoading) {
    return <></>;
  }

  if (!userSigned) {
    return (
      <div className="px-4 md:px-6 lg:px-8 py-5 border-b z-20">
        <h1 className="text-4xl font-extrabold text-slate-800">SkillShare</h1>
        <Button variant={"ghost"}>Hey</Button>
      </div>
    );
  }
};

export default Header;

// import { UserState } from "../store/atoms/user.ts";
import { useRecoilState, useRecoilValue } from "recoil";
import {userIsLoading} from "../store/selectors/userIsLoading.ts";
import {username} from "../store/selectors/username.ts";

const Header = () => {
  // const [userState, setUserState] = useRecoilState(UserState);
  const isLoading = useRecoilValue(userIsLoading);
  const userSigned = useRecoilValue(username);

  if(!isLoading){
      return <></>
  }

  if(!userSigned) {
      return (
        <div></div>
      );
  }
};

export default Header;

// import { UserState } from "../store/atoms/user.ts";
import LandingHeader from "./LandingHeader.tsx"
import { adminState } from "@/store/atoms/admin.ts";
import TeacherSignedHeader from "./TeacherSignedHeader.tsx";
import { useRecoilValue } from "recoil";

const Header = () => {
  const adminSigned = useRecoilValue(adminState)
  console.log(adminSigned.username);
  
if(adminSigned.isLoading){
  return <div className="px-4 md:px-6 lg:px-8 py-5  flex justify-between items-center bg-transparent">Loader</div>
}
if(adminSigned.username){
    return <TeacherSignedHeader />
  }
  
return(
    <>
      <LandingHeader/>
    </>
  )
};
export default Header;

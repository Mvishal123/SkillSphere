// import { UserState } from "../store/atoms/user.ts";
import LandingHeader from "./admin/Header/LandingHeader.tsx";
import { adminState } from "@/store/atoms/admin.ts";
import TeacherSignedHeader from "./admin/Header/TeacherSignedHeader.tsx";
import { useRecoilValue } from "recoil";
import UserHeader from "./user/header/UserHeader.tsx";
import { HeaderType } from "@/store/atoms/header.ts";

const Header = () => {
  const adminSigned = useRecoilValue(adminState);
  const headerType = useRecoilValue(HeaderType);

  if (adminSigned.isLoading) {
    return (
      <div className="px-4 md:px-6 lg:px-8 py-5 flex justify-between items-center bg-transparent">
        .
      </div>
    );
  }
  if (!headerType.type || headerType.type === "admin") {
    return (
      <>
        <LandingHeader />
      </>
    );
  }

  if (headerType.type === "admin" && adminSigned.username  ) {
    return <TeacherSignedHeader />;
  }

  if (headerType.type === "user") {
    console.log(headerType.type);
    
    return (
      <>
        <UserHeader />
      </>
    );
  }
};
export default Header;

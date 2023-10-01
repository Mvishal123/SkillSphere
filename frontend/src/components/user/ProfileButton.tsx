import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  // DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { adminState } from "@/store/atoms/admin";
import { useNavigate } from "react-router-dom";
// import { useRecoilState, useRecoilValue } from "recoil";

const ProfileButton = () => {
  const navigate = useNavigate();
  // const [admin, setAdmin] = useRecoilState(adminState);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>X</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="text-center">
          <DropdownMenuLabel>
            <span>Welcome!</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
            <div>
              <Button variant="ghost" onClick={() => navigate("/user/signup")}>
                Sign up
              </Button>
              <Button variant="ghost" onClick={() => navigate("/user/signin")}>
                Sign in
              </Button>
            </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default ProfileButton;

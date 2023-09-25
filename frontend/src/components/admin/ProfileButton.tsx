import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { adminState } from "@/store/atoms/admin";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

const ProfileButton = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useRecoilState(adminState);

  return (
    <div className="lg:hidden">
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
          {!admin.username ? (
            <div className="m-auto">
              <span>Sign as</span>
              <DropdownMenuItem className="cursor-pointer justify-center">
                <Button
                  className="h-full w-full"
                  onClick={() => navigate("admin/signup")}
                >
                  Teacher
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer justify-center hover:none">
                <Button className="h-full w-full">Student</Button>
              </DropdownMenuItem>
            </div>
          ) : (
            <div className="flex flex-col gap-4 items-center">
              <Button variant={"ghost"}>Profile</Button>
              <Button
                variant={"ghost"}
                className="bg-purple-600 text-white w-2/3 "
                onClick={() => {
                  setAdmin({
                    username: null,
                    isLoading: false
                  });
                  localStorage.setItem("token", "");
                  navigate("/admin")
                }}
              >
                log out
              </Button>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default ProfileButton;

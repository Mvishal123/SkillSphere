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
import { useNavigate } from "react-router-dom";

const ProfileButton = () => {
  const navigate = useNavigate();

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
          <div className="m-auto">
            <span>Sign as</span>
            <DropdownMenuItem className="cursor-pointer justify-center">
              <Button className="h-full w-full"onClick={() => navigate("admin/signup") }>Teacher</Button>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer justify-center hover:none">
              <Button className="h-full w-full">Student</Button>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default ProfileButton;

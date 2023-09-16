import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { Button } from "./button";

const DialogButtonAddCourse = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="mt-6">Add Course</Button>
      </DialogTrigger>
      <DialogContent>
        <div>
          <span
            className="text-red-600 text-xl underline"
            onClick={async () => {
                const res = await axios.post(`${process.env.BASE_URL}/admin/courses`);
            }}
          >
            CONFIRM?
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogButtonAddCourse;

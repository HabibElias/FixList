import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import store from "@/store/configureStore";
import { deleteProject } from "@/store/projects";
import { useNavigate } from "react-router-dom";
import { deleteProjectBugs } from "@/store/bugs";

export default function PopupDelete({ id }: { id: number }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    store.dispatch(deleteProject({ id }));
    store.dispatch(deleteProjectBugs({ id }));
    navigate("/");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"secondary"}
          className="flex cursor-pointer items-center justify-center gap-2 rounded p-3 font-[poppins] text-xs transition-colors duration-200 hover:bg-red-400 hover:text-white hover:opacity-100"
        >
          <Trash className="size-4" />
          Delete Project
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription className="mb-5">
              Are you sure you want to delete this project?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="default"
              className="cursor-pointer bg-red-200 hover:bg-red-400"
              type="submit"
            >
              Yes
            </Button>
            <Button
              variant="ghost"
              className="cursor-pointer"
              type="button"
              onClick={() => setOpen(false)}
            >
              No
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

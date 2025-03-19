import type React from "react";
import { useRef, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { createProject } from "@/store/projects";
import store from "@/store/configureStore";

export default function PopupForm() {
  const [open, setOpen] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    if (descRef.current && nameRef.current)
      store.dispatch(
        createProject({
          desc: descRef.current.value,
          name: nameRef.current.value,
        }),
      );
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex cursor-pointer items-center justify-center gap-2 rounded bg-red-400 p-2 font-[poppins] text-xs text-white opacity-65 transition-opacity duration-200 hover:opacity-100">
          <Plus />
          Create Project
        </button>
      </DialogTrigger>
      <DialogContent className="min-w-max bg-white dark:bg-black sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create a Project</DialogTitle>
            <DialogDescription>
              create a project with a description, to insert a list of bugs you <br />
              encountered during development
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="mb-3 space-y-3">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                className="max-w-100 overflow-auto"
                ref={nameRef}
                required
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="message" className="text-center">
                Description
              </Label>
              <Textarea
                id="message"
                ref={descRef}
                className="max-h-50 max-w-100 overflow-auto lg:max-h-100"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="cursor-pointer" type="submit">
              <Plus /> Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { bugAdded } from "@/store/bugs";
import store from "@/store/configureStore";
import { Bug, Plus } from "lucide-react";
import type React from "react";
import { useRef, useState } from "react";

export default function PopupCreate({ id }: { id: number }) {
  const [open, setOpen] = useState(false);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const errorRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    if (descRef.current && errorRef.current)
      store.dispatch(
        bugAdded({
          desc: descRef.current.value,
          projectId: id,
          error: errorRef.current.value,
        }),
      );
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"link"}
          className="flex cursor-pointer items-center justify-center gap-2 rounded bg-red-400 p-2 font-[poppins] text-xs text-white opacity-65 transition-opacity duration-200 hover:no-underline hover:opacity-100"
        >
          <Bug />
          Create Bug
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create a Bug</DialogTitle>
            <DialogDescription>
              create a bug with a description
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <Label htmlFor="message" className="text-center">
                Description
              </Label>
              <Textarea
                id="message"
                ref={descRef}
                className="max-h-50 lg:max-h-100"
                required
              />
            </div>
          </div>
          <div className="py-4">
            <div className="space-y-4">
              <Label htmlFor="message" className="text-center">
                Error Message
              </Label>
              <Textarea
                id="error"
                ref={errorRef}
                className="max-h-50 lg:max-h-100"
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

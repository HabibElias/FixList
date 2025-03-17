import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ClipboardList, Code } from "lucide-react";
import { useState } from "react";
import { Button } from "./button";

export default function ErrorPopup({ errMsg }: { errMsg: string }) {
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => setOpen(false);

  const handleCopy = () => () => {
    navigator.clipboard.writeText(errMsg);
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex cursor-pointer items-center justify-center gap-2 rounded bg-red-400 p-2 font-[poppins] text-xs text-white opacity-65 transition-opacity duration-200 hover:opacity-100">
          Error <Code />
        </button>
      </DialogTrigger>
      <DialogContent className="flex min-h-[40%] flex-col bg-white sm:max-w-[80%]">
        <pre className="w-[inherit] flex-2 overflow-auto break-words">
          {!errMsg ? "No error message" : errMsg}
        </pre>
        <DialogFooter>
          <Button
            onClick={handleCopy}
            className="cursor-pointer opacity-45 duration-200 hover:opacity-100"
          >
            <ClipboardList />
            copy
          </Button>
          <Button
            className="cursor-pointer opacity-45 duration-200 hover:opacity-100"
            variant={"secondary"}
            onClick={handleClose}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

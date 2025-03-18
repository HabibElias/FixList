import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ClipboardList, Code } from "lucide-react";
import { useState } from "react";
import { Button } from "./button";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

export default function ErrorPopup({ errMsg }: { errMsg: string }) {
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => setOpen(false);

  const handleCopy = () => {
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
      <DialogContent className="flex max-h-[80%] min-h-[40%] flex-col overflow-auto bg-white sm:max-w-[80%]">
        <DialogTitle className="font-[poppins]">Error Msg</DialogTitle>
        <DialogDescription
          asChild
          className="bg-foreground text-red-200 shadow-accent-foreground p-3 w-[inherit] flex-2 overflow-auto text-xs break-words"
        >
          <pre>{!errMsg ? "No error message" : errMsg}</pre>
        </DialogDescription>
        <DialogFooter>
          <Button
            onClick={handleCopy}
            className="cursor-pointer opacity-45 duration-200 hover:opacity-100"
          >
            <ClipboardList />
            Copy
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

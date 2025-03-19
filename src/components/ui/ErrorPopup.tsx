import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ClipboardCheck, ClipboardList, Code } from "lucide-react";
import { useState } from "react";
import { Button } from "./button";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

export default function ErrorPopup({ errMsg }: { errMsg: string }) {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => setOpen(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(errMsg);
    setIsCopied(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex cursor-pointer items-center justify-center gap-2 rounded bg-red-400 p-2 font-[poppins] text-xs text-white opacity-65 transition-opacity duration-200 hover:opacity-100">
          Error <Code />
        </button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[80%] min-h-[40%] flex-col overflow-auto bg-white shadow-xs shadow-[#ffffff4b] sm:max-w-[80%] dark:bg-[#010101]">
        <DialogTitle className="font-[poppins]">Error Msg</DialogTitle>
        <DialogDescription
          asChild
          className="bg-foreground dark:bg-accent shadow-accent-foreground w-[inherit] flex-2 overflow-auto p-3 text-xs break-words text-red-200"
        >
          <pre>{!errMsg ? "No error message" : errMsg}</pre>
        </DialogDescription>
        <DialogFooter>
          <Button
            onClick={handleCopy}
            className="cursor-pointer opacity-45 duration-200 hover:opacity-100"
          >
            {!isCopied ? (
              <>
                <ClipboardList />
                Copy
              </>
            ) : (
              <>
                <ClipboardCheck />
                Copied
              </>
            )}
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

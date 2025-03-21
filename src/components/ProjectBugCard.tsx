import { bugResolved, deleteBugs } from "@/store/bugs";
import store from "@/store/configureStore";
import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import Bug from "@/model/Bug";
import { useState } from "react";
import { getProject } from "@/store/projects";
import ErrorPopup from "./ui/ErrorPopup";

const ProjectBugCard = ({ bug: b }: { bug: Bug }) => {
  const [isMore, setIsMore] = useState<boolean>(false);
  const project = getProject(b.projectId)(store.getState());

  return (
    <div className="flex flex-col space-y-2 rounded p-2 ring-1">
      {
        // project name
      }
      <div className="flex items-center gap-1">
        <p className="text-[0.9rem]">Project: </p>
        <p className={`p-2 text-[0.8rem] opacity-65`}>{project?.pName}</p>
      </div>
      {
        // description
      }
      <div className="flex-2 *:inline break-words">
        <p className="text-[0.9rem]">Desc: </p>
        <p
          className={`text-[0.8rem] ${b.resolved ? "line-through" : ""} opacity-70`}
        >
          {!isMore ? b.desc.slice(0, 200) + "..." : b.desc}
        </p>
        <Button
          onClick={() => setIsMore(!isMore)}
          variant={"link"}
          className="cursor-pointer p-3"
        >
          {!isMore ? "More" : "Less"}
        </Button>
      </div>
      {
        // error msg
      }
      <div></div>
      {
        // resolved or unresolved
      }
      <div className="flex items-center gap-1">
        <p className="text-[0.9rem]">Resolved: </p>
        <Button
          variant={"secondary"}
          onClick={() => {
            store.dispatch(bugResolved({ id: b.id }));
          }}
          className="cursor-pointer rounded p-3 transition-colors duration-200 hover:bg-red-400 hover:text-white hover:opacity-100"
        >
          {b.resolved ? "resolved" : "unresolved"}
        </Button>
      </div>
      {
        // date creation
      }
      <div className="flex items-center gap-1">
        <p className="text-[0.9rem]">Date Created: </p>
        <p className={`p-2 text-[0.8rem] opacity-65`}>
          {b.date}
        </p>
      </div>
      {
        // btns
      }
      <div className="flex gap-3 self-end justify-self-end">
        <ErrorPopup errMsg={b.error} />
        <Button
          variant={"secondary"}
          onClick={() => {
            store.dispatch(deleteBugs({ id: b.id }));
          }}
          className="cursor-pointer rounded p-3 transition-colors duration-200 hover:bg-red-400 hover:text-white hover:opacity-100"
        >
          <Trash className="size-4" />
        </Button>
      </div>
    </div>
  );
};

export default ProjectBugCard;

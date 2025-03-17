import PopupCreate from "@/components/popup-create";
import PopupDelete from "@/components/popup-delete";
import ProjectBugCard from "@/components/ProjectBugCard";
import Bug from "@/model/Bug";
import { getProjectBugs } from "@/store/bugs";
import store from "@/store/configureStore";
import { getProject } from "@/store/projects";
import { BugIcon, Table } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProjectPage = () => {
  const { id } = useParams();
  if (!id) return;

  const project = getProject(parseInt(id))(store.getState());
  const [pBugs, setPBugs] = useState<Bug[]>(
    getProjectBugs(parseInt(id))(store.getState()),
  );

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setPBugs(getProjectBugs(parseInt(id))(store.getState()));
    });

    return () => unsubscribe();
  }, []);

  if (!project) return;

  return (
    <div className="font-[poppins]">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <p className="text-[0.7rem] opacity-45">Name</p>
          <h1 className="text-4xl font-bold tracking-tighter">
            {project.pName}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <PopupCreate id={project.id} />
          <PopupDelete id={project.id} />
        </div>
      </div>
      <div className="mb-7">
        <p className="text-[0.7rem] opacity-45">Description</p>
        <p>{project.desc}</p>
      </div>
      <div className="mb-5 flex items-center justify-between gap-2 border-b-2 pb-3 font-[poppins]">
        <div className="flex items-center gap-2">
          <BugIcon className="size-6 text-red-500" />
          Bugs
        </div>
        <div>
          <Table />
        </div>
      </div>
      <div
        className={
          pBugs.length === 0
            ? "flex items-center justify-center min-h-80"
            : `grid grid-cols-2 gap-3`
        }
      >
        {pBugs.map((b, index) => (
          <ProjectBugCard key={index} bug={b} />
        ))}
        {pBugs.length === 0 && <div className="opacity-45">No Bug To Fix</div>}
      </div>
    </div>
  );
};

export default ProjectPage;

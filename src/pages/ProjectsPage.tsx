import { getAllProjects } from "../store/projects";
import store from "../store/configureStore";
import PopupForm from "@/components/popup-form";
import { useEffect, useState } from "react";
import Project from "@/model/Project";
import { AppWindowIcon, PlusCircleIcon, Table } from "lucide-react";
import { getProjectBugs } from "@/store/bugs";
import { Link } from "react-router-dom";

const ProjectsPage = () => {
  const projects = getAllProjects(store.getState());

  const [projectList, setProjectList] = useState<Project[]>(projects);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setProjectList(getAllProjects(store.getState()));
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className="mb-12 flex flex-wrap items-center justify-between gap-2 font-[poppins]">
        <div className="">
          <h1>Create a Project</h1>
          <p className="text-xs opacity-45 lg:text-[0.9rem]">
            create a project with a description, to insert a list of bugs you
            encountered during development
          </p>
        </div>
        <PopupForm />
      </div>
      <div className="mb-5 flex items-center justify-between gap-2 font-[poppins]">
        <div className="flex items-center gap-2">
          <AppWindowIcon className="size-6 text-red-500" />
          Your Projects
        </div>
        <div>
          <Table />
        </div>
      </div>
      <div
        className={
          projectList.length == 0
            ? "flex min-h-80 items-center justify-center"
            : `grid grid-cols-2 gap-3`
        }
      >
        {projectList.map((p) => {
          const pBugs = getProjectBugs(p.id)(store.getState());
          return (
            <Link
              to={`/project/${p.id}`}
              key={p.id}
              className="relative cursor-pointer rounded bg-red-50 p-3 font-[poppins] ring-red-300 duration-100 hover:scale-101 hover:bg-white hover:shadow-xl hover:ring-2"
            >
              <div className="text-xl font-bold tracking-tight">{p.pName}</div>
              <div className="text-xs opacity-45 lg:text-[0.9rem]">
                {p.desc}
              </div>
              <div className="absolute top-3 right-3 rounded bg-red-400 px-2 py-1 text-center text-xs text-white">
                {pBugs.length}
              </div>
            </Link>
          );
        })}
        {projectList.length == 0 && (
          <div className="flex items-center gap-2 opacity-45 font-[poppins]">
            No project created, please create a project.
            <PlusCircleIcon />
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectsPage;

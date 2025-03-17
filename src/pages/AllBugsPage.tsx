import ProjectBugCard from "@/components/ProjectBugCard";
import { BugIcon, Info, Search, Table } from "lucide-react";
import { getAllBugs } from "../store/bugs";
import store from "../store/configureStore";
import { useEffect, useState } from "react";
import Bug from "@/model/Bug";

const AllBugsPage = () => {
  const [bugs, setBugs] = useState<Bug[]>(getAllBugs(store.getState()));

  useEffect(() => {
    const unsubscribe = store.subscribe(() =>
      setBugs(getAllBugs(store.getState())),
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-12 font-[poppins]">
      <div className="flex flex-wrap justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Info className="text-red-500" />
            Bugs
          </div>
          <p className="py-2 text-[0.9rem] opacity-45">
            All of your project bugs are displayed below
          </p>
        </div>
        <form className="flex items-center">
          <input
            type="text"
            className="flex-2 rounded-l-lg bg-gray-50 p-2 transition-colors duration-100 outline-none focus:bg-red-50"
            placeholder="search..."
            name="search"
          />
          <button
            className="flex-none cursor-pointer rounded-r-lg bg-red-300 p-2 opacity-40 transition-opacity duration-200 hover:opacity-100"
            type="submit"
          >
            <Search />
          </button>
        </form>
      </div>
      <div className="mb-5 flex items-center justify-between gap-2 border-b-2 pb-3 font-[poppins]">
        <div className="flex items-center gap-2">
          <BugIcon className="size-6 text-red-500" />
          All Bugs
        </div>
        <div>
          <Table />
        </div>
      </div>
      <div
        className={
          bugs.length === 0
            ? "flex min-h-80 items-center justify-center"
            : `grid grid-cols-2 gap-3`
        }
      >
        {bugs.map((b, index) => (
          <ProjectBugCard key={index} bug={b} />
        ))}
        {bugs.length === 0 && <div className="opacity-45">No Bug To Fix</div>}
      </div>
    </div>
  );
};

export default AllBugsPage;

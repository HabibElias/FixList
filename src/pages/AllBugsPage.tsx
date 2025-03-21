import ProjectBugCard from "@/components/ProjectBugCard";
import Bug from "@/model/Bug";
import { BugIcon, Info, Search, Table, TableRowsSplit } from "lucide-react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { getAllBugs } from "../store/bugs";
import store from "../store/configureStore";

const AllBugsPage = () => {
  const [bugs, setBugs] = useState<Bug[]>(getAllBugs(store.getState()));
  const [srcTxt, setSrcTxt] = useState<string>("");
  const [isGrid, setIsGrid] = useState<boolean>(true);

  const srcRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setSrcTxt(srcRef.current?.value || "");
  };

  const filtered = useMemo(() => {
    return bugs.filter((b) =>
      b.desc.toLowerCase().includes(srcTxt.toLowerCase()),
    );
  }, [srcTxt, bugs]);

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
        <form className="flex items-center" onSubmit={handleSearch}>
          <input
            type="text"
            ref={srcRef}
            className="flex-2 rounded-l-lg bg-gray-50 p-2 transition-colors duration-100 outline-none focus:bg-red-50 dark:bg-[#181818]"
            placeholder="search..."
            name="search"
          />
          <button
            className="flex-none cursor-pointer rounded-r-lg bg-red-400 p-2 text-white opacity-40 transition-opacity duration-200 hover:opacity-100 dark:bg-red-400"
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
        <button 
        className="hover:opacity-45 duration-200"
        onClick={() => setIsGrid(!isGrid)}>
          {isGrid ? <Table /> : <TableRowsSplit />}
        </button>
      </div>
      <div
        className={
          filtered.length === 0
            ? "flex min-h-80 items-center justify-center"
            : isGrid
              ? `grid grid-cols-2 gap-3`
              : `grid grid-cols-1 gap-3`
        }
      >
        {filtered.map((b, index) => (
          <ProjectBugCard key={index} bug={b} />
        ))}
        {filtered.length === 0 && !srcTxt && (
          <div className="opacity-45">No Bug To Fix</div>
        )}
        {filtered.length === 0 && srcTxt && (
          <div className="opacity-45">
            There is no bug with the description of "{srcTxt}"
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBugsPage;

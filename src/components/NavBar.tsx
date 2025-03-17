import { BugOff, Sun } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="flex items-center justify-between">
      <Link
        to={"/"}
        className="flex items-center gap-2 font-[code2000] text-xl"
      >
        <BugOff className="text-red-600" />
        FixList
      </Link>

      <ul className="flex items-center gap-[1.5rem] font-[poppins] transition-colors *:inline-block *:cursor-pointer *:duration-150 *:hover:opacity-30 [&_a.active]:opacity-30">
        <NavLink to={""}>Projects</NavLink>
        <NavLink to={"/allBugs"}>All bugs</NavLink>
        <NavLink to={"/profile"}>
          <Sun />
        </NavLink>
      </ul>
    </div>
  );
};

export default NavBar;

import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="mx-auto p-5 lg:w-[70%]">
      <div className="mb-10">
        <NavBar />
      </div>
      <div className="min-h-[80vh]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;

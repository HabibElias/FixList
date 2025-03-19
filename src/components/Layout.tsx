import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="max-h-max min-h-[100vh] max-w-max min-w-[100%]">
      <div className="mx-auto p-5 lg:w-[70%]">
        <div className="mb-10">
          <NavBar />
        </div>
        <div className="min-h-[80vh]">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

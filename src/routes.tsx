import { createBrowserRouter } from "react-router-dom";
import ProjectsPage from "./pages/ProjectsPage";
import AllBugsPage from "./pages/AllBugsPage";
import Layout from "./components/Layout";
import ProjectPage from "./pages/ProjectPage";

const routes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "", element: <ProjectsPage /> },
      { path: "allBugs", element: <AllBugsPage /> },
      { path: "project/:id", element: <ProjectPage /> },
    ],
  },
]);

export default routes;

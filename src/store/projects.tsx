import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Project from "../model/Project";

// payload interfaces
interface createProjectPayload {
  name: string;
  desc: string;
}

interface deleteProjectPayload {
  id: number;
}

//index
let lastId = 1;

// reducer
const slice = createSlice({
  name: "projects",
  initialState: [
    // {
    //   id: 1,
    //   desc: "a lyrics application for my choir",
    //   pName: "Basleal",
    // },
  ] as Project[],
  reducers: {
    createProject: (
      state: Project[],
      action: PayloadAction<createProjectPayload>,
    ) => {
      state.push({
        id: ++lastId,
        pName: action.payload.name,
        desc: action.payload.desc,
      });
    },
    deleteProject: (
      state: Project[],
      action: PayloadAction<deleteProjectPayload>,
    ) => {
      return state.filter((project) => project.id !== action.payload.id);
    },
  },
});

const selectProject = (state: { entities: { projects: Project[] } }) =>
  state.entities.projects;
// selector
export const getAllProjects = createSelector([selectProject], (projects) =>
  projects.slice(),
);

export const getProject = (projectId: number) =>
  createSelector([selectProject], (projects) =>
    projects.find((p) => p.id === projectId),
  );

export default slice.reducer;
export const { createProject, deleteProject } = slice.actions;

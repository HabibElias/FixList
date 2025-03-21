import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Bug from "../model/Bug";

// payload action
interface AddBugPayload {
  desc: string;
  error: string;
  projectId: number;
}
interface ResolveBugPayload {
  id: number;
}
interface deleteProjectBugsPayload {
  id: number;
}
interface deleteBugsPayload {
  id: number;
}

// index
let lastIndex = 1;

// reducer
const slice = createSlice({
  name: "bugs",
  initialState: [
    // {
    //   id: 0,
    //   projectId: 1,
    //   desc: "Rendering problem need to fix it",
    //   error: `defined
    // at ProjectPage (ProjectPage.tsx?t=1742206987720:87:72)
    // at react-stack-bottom-frame (react-dom_client.js?v=c7272d47:16192:20)
    // at renderWithHooks (react-dom_client.js?v=c7272d47:4306:24)
    // at updateFunctionComponent (react-dom_client.js?v=c7272d47:5972:21)
    // at beginWork (react-dom_client.js?v=c7272d47:7048:20)
    // at runWithFiberInDEV (react-dom_client.js?v=c7272d47:726:18)
    // at performUnitOfWork (react-dom_client.js?v=c7272d47:10831:98)
    // at workLoopSync (react-dom_client.js?v=c7272d47:10692:43)
    // at renderRootSync (react-dom_client.js?v=c7272d47:10675:13)
    // at performWorkOnRoot (react-dom_client.js?v=c7272d47:10323:46) Error Component Stack
    // at DefaultErrorComponent (react-router-dom.js?v=c7272d47:5653:15)
    // at RenderErrorBoundary (react-router-dom.js?v=c7272d47:5672:5)
    // at DataRoutes (react-router-dom.js?v=c7272d47:6302:3)
    // at Router (react-router-dom.js?v=c7272d47:6387:13)
    // at RouterProvider (react-router-dom.js?v=c7272d47:6132:11)
    // at RouterProvider2 (<anonymous>)`,
    //   resolved: false,
    //   date: new Date().toDateString(),
    // },
  ] as Bug[],
  reducers: {
    bugAdded: (bugs: Bug[], action: PayloadAction<AddBugPayload>) => {
      bugs.push({
        id: lastIndex++,
        desc: action.payload.desc,
        projectId: action.payload.projectId,
        error: action.payload.error,
        resolved: false,
        date: new Date().toDateString(),
      } as Bug);
    },
    deleteProjectBugs: (
      bugs: Bug[],
      action: PayloadAction<deleteProjectBugsPayload>,
    ) => {
      return bugs.filter((b) => b.projectId !== action.payload.id);
    },
    deleteBugs: (bugs: Bug[], action: PayloadAction<deleteBugsPayload>) => {
      return bugs.filter((b) => b.id !== action.payload.id);
    },
    bugResolved: (bugs: Bug[], action: PayloadAction<ResolveBugPayload>) => {
      const index = bugs.findIndex((b) => b.id === action.payload.id);
      bugs[index].resolved = !bugs[index].resolved;
    },
  },
});

// selectors
const selectBugs = (state: { entities: { bugs: Bug[] } }) =>
  state.entities.bugs;

export const getAllBugs = createSelector([selectBugs], (bugs: Bug[]) =>
  bugs.slice(),
);

export const getProjectBugs = (projectId: number) =>
  createSelector([selectBugs], (bugs: Bug[]) =>
    bugs.filter((bug) => bug.projectId === projectId),
  );

export const getUnresolvedBugs = createSelector([selectBugs], (bugs: Bug[]) =>
  bugs.filter((bug) => !bug.resolved),
);

export const { bugAdded, bugResolved, deleteBugs, deleteProjectBugs } =
  slice.actions;
export default slice.reducer;

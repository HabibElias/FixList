import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";

// i want to locally store the state and persist the data when reopening

const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (e) {
    console.error("Could not save state: ", e);
  }
};

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (e) {
    console.error("Could not load state: ", e);
    return undefined;
  }
};

const preloadedState = loadState();

const store = configureStore({ reducer, preloadedState });

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
  saveState(store.getState());
});

export default store;

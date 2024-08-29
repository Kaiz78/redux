// reducers/rootReducer.ts

import { combineReducers } from '@reduxjs/toolkit';
// Dashboard redux


// import allProjectsReducer from "./allProjectsSlice";
import langReducer from './langReducer';
import homeReducer from './homeSlice';
import { ressourceSlice }  from './ressourceSlice';

const rootReducer = combineReducers({
  home: homeReducer,
  // allProjects: allProjectsReducer,
  lang: langReducer,
  [ressourceSlice.reducerPath]: ressourceSlice.reducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

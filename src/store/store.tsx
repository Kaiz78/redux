// store.ts

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducer";
import { ressourceSlice } from "./reducers/ressourceSlice";


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(ressourceSlice.middleware);
  }
});

export type RootState = ReturnType<typeof store.getState>

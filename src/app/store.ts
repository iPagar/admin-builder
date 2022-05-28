import { configureStore } from "@reduxjs/toolkit";
import { exampleEndpoints } from "./slices/exampleEndpoints";
import { apiSlice } from "./slices/apiSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    [exampleEndpoints.reducerPath]: exampleEndpoints.reducer,
  },
  middleware: (gDM) => gDM().concat(apiSlice.middleware),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const appDispatch = store.dispatch;
export const appState = store.getState();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

setupListeners(store.dispatch);

export default store;

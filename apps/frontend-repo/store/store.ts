import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { UserState } from "./types";
import { initialUserState, userReducer } from "./reducers";

const reducer = combineReducers({
  userState: userReducer,
});

export interface AppState {
  userState: UserState;
}

export const initialAppState: AppState = {
  userState: initialUserState,
};

export const store = configureStore({
  reducer,
  preloadedState: initialAppState as any,
});

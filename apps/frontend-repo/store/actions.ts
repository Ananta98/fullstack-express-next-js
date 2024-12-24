import { ThunkAction } from "redux-thunk";
import {
  LOAD_USER_PROFILE_FAILURE,
  LOAD_USER_PROFILE_REQUEST,
  LOAD_USER_PROFILE_SUCCESS,
  LOAD_USERS_LIST_FAILURE,
  LOAD_USERS_LIST_REQUEST,
  LOAD_USERS_LIST_SUCCESS,
  UserState,
} from "./types";
import { Action } from "@reduxjs/toolkit";
import { getUserList, getUserProfile } from "../app/apis/userApi";

export function loadUserList(
  token: string
): ThunkAction<void, UserState, null, Action<string>> {
  return (dispatch: any) => {
    dispatch({ type: LOAD_USERS_LIST_REQUEST });
    return getUserList(token)
      .then(async (response) => {
        const result = await response.json();
        dispatch({
          type: LOAD_USERS_LIST_SUCCESS,
          payload: { users: result },
        });
      })
      .catch((error) => {
        dispatch({ type: LOAD_USERS_LIST_FAILURE, payload: error });
      });
  };
}

export function loadUserProfile(
  token: string
): ThunkAction<void, UserState, null, Action<string>> {
  return (dispatch: any) => {
    dispatch({ type: LOAD_USER_PROFILE_REQUEST });
    return getUserProfile(token)
      .then(async (response) => {
        const result = await response.json();
        dispatch({
          type: LOAD_USER_PROFILE_SUCCESS,
          payload: { user: result },
        });
      })
      .catch((error) => {
        dispatch({ type: LOAD_USER_PROFILE_FAILURE, payload: error });
      });
  };
}

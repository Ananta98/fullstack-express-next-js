import {
  LOAD_USER_PROFILE_FAILURE,
  LOAD_USER_PROFILE_REQUEST,
  LOAD_USER_PROFILE_SUCCESS,
  LOAD_USERS_LIST_FAILURE,
  LOAD_USERS_LIST_REQUEST,
  LOAD_USERS_LIST_SUCCESS,
  UserActionTypes,
  UserState,
} from "./types";

export const initialUserState: UserState = {
  users: [],
  user: undefined,
  loading: false,
  error: undefined,
};

export function userReducer(state = initialUserState, action: UserActionTypes) {
  switch (action.type) {
    case LOAD_USERS_LIST_REQUEST:
      return { ...state, loading: true, error: "" };
    case LOAD_USERS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        users: "users" in action.payload ? action.payload.users : [],
        error: "",
      };
    case LOAD_USERS_LIST_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    case LOAD_USER_PROFILE_REQUEST:
      return { ...state, loading: true, error: "" };
    case LOAD_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: "user" in action.payload ? action.payload.user : [],
        error: "",
      };
    case LOAD_USER_PROFILE_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
}

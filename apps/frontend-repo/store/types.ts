import { User } from "../../shared/user";

export const LOAD_USERS_LIST_REQUEST = "LOAD_USERS_REQUEST";
export const LOAD_USERS_LIST_SUCCESS = "LOAD_USERS_SUCCESS";
export const LOAD_USERS_LIST_FAILURE = "LOAD_USERS_FAILURE";
export const LOAD_USER_PROFILE_REQUEST = "LOAD_USER_PROFILE_REQUEST";
export const LOAD_USER_PROFILE_SUCCESS = "LOAD_USER_PROFILE_SUCCESS";
export const LOAD_USER_PROFILE_FAILURE = "LOAD_USER_PROFILE_FAILURE";

interface LoadUsersListRequest {
  type: typeof LOAD_USERS_LIST_REQUEST;
}

interface LoadUsersListSuccess {
  type: typeof LOAD_USERS_LIST_SUCCESS;
  payload: { users: User[] };
}

interface LoadUsersListFailure {
  type: typeof LOAD_USERS_LIST_FAILURE;
  payload: { error: string };
}

interface LoadUserProfileRequest {
  type: typeof LOAD_USER_PROFILE_REQUEST;
}

interface LoadUserProfileSuccess {
  type: typeof LOAD_USER_PROFILE_SUCCESS;
  payload: { user: User };
}

interface LoadUserProfileFailure {
  type: typeof LOAD_USER_PROFILE_FAILURE;
  payload: { error: string };
}

export type UserActionTypes =
  | LoadUsersListRequest
  | LoadUsersListSuccess
  | LoadUsersListFailure
  | LoadUserProfileRequest
  | LoadUserProfileSuccess
  | LoadUserProfileFailure;

export interface UserState {
  loading: boolean;
  users: User[];
  user: User | undefined;
  error: string | undefined;
}

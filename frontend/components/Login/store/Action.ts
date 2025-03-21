export enum loginActionTypes {
  GET_LOGIN_REQUEST = "GET_LOGIN_REQUEST",
  SET_LOGIN_REQUEST = "SET_LOGIN_REQUEST",
  SET_LOGIN_ERROR = "SET_LOGIN_ERROR",
  CLEAR_LOGIN_DATA = "CLEAR_LOGIN_DATA",
  GET_LOGOUT_REQUEST = "GET_LOGOUT_REQUEST",
  SET_LOGOUT_REQUEST = "SET_LOGOUT_REQUEST",
  SET_LOGOUT_ERROR = "SET_LOGOUT_ERROR",
}

// Action Creators
export const getLoginRequest = (credentials: any) => ({
  type: loginActionTypes.GET_LOGIN_REQUEST,
  payload: credentials,
});
export const setLoginRequest = (user: any) => ({
  type: loginActionTypes.SET_LOGIN_REQUEST,
  payload: user,
});

export const setLoginError = (error: string) => ({
  type: loginActionTypes.SET_LOGIN_ERROR,
  payload: error,
});

export const clearLoginData = () => ({
  type: loginActionTypes.CLEAR_LOGIN_DATA,
});

export const getLogoutRequest = (email: string) => ({
  type: loginActionTypes.GET_LOGOUT_REQUEST,
  payload: email,
});
export const setLogoutRequest = (email: string) => ({
  type: loginActionTypes.SET_LOGOUT_REQUEST,
  payload: email,
});

export const setLogoutError = (error: string) => ({
  type: loginActionTypes.SET_LOGOUT_ERROR,
  payload: error,
});

export const loginActions = {
  getLoginRequest,
  setLoginRequest,
  setLoginError,
  clearLoginData,
  getLogoutRequest,
  setLogoutRequest,
  setLogoutError,
};

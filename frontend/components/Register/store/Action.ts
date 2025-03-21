export enum registerActionTypes {
  GET_REGISTER_REQUEST = "GET_REGISTER_REQUEST",
  SET_REGISTER_REQUEST = "SET_REGISTER_SUCCESS",
  SET_REGISTER_ERROR = "REGISTER_ERROR",
  CLEAR_REGISTER_DATA = "CLEAR_REGISTER_DATA",
  GET_DELETE_ACCOUNT_REQUEST = "GET_DELETE_ACCOUNT_REQUEST",
  SET_DELETE_ACCOUNT_REQUEST = "SET_DELETE_ACCOUNT_REQUEST",
  SET_DELETE_ACCOUNT_ERROR = "SET_DELETE_ACCOUNT_ERROR",
}

// Actions
export const getRegisterRequest = (userData: any) => ({
  type: registerActionTypes.GET_REGISTER_REQUEST,
  payload: userData,
});

export const setRegisterRequest = (user: any) => ({
  type: registerActionTypes.SET_REGISTER_REQUEST,
  payload: user,
});

export const setRegisterError = (error: any) => ({
  type: registerActionTypes.SET_REGISTER_ERROR,
  payload: error,
});

export const clearRegisterData = () => ({
  type: registerActionTypes.CLEAR_REGISTER_DATA,
});

export const getDeleteAccountRequest = (userData: any) => ({
  type: registerActionTypes.GET_DELETE_ACCOUNT_REQUEST,
  payload: userData,
});

export const setDeleteAccountRequest = (user: any) => ({
  type: registerActionTypes.SET_DELETE_ACCOUNT_REQUEST,
  payload: user,
});

export const setDeleteAccountError = (error: any) => ({
  type: registerActionTypes.SET_DELETE_ACCOUNT_ERROR,
  payload: error,
});

export const registerActions = {
  getRegisterRequest,
  setRegisterRequest,
  setRegisterError,
  clearRegisterData,
  getDeleteAccountRequest,
  setDeleteAccountRequest,
  setDeleteAccountError,
};

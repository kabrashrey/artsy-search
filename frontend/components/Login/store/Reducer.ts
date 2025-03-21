import { loginActionTypes } from "./Action";

const initialLoginState = {
  login_data: null,
  login_error: "",
  login_loading: false,
};

const initialLogoutState = {
  logout_data: null,
  logout_error: "",
  logout_loading: false,
};

const loginReducer = (state = initialLoginState, action: any) => {
  switch (action.type) {
    case loginActionTypes.GET_LOGIN_REQUEST:
      return {
        ...state,
        login_loading: true,
        login_data: "",
      };
    case loginActionTypes.SET_LOGIN_REQUEST:
      return {
        ...state,
        login_loading: false,
        login_data: action.payload,
        login_error: "",
      };
    case loginActionTypes.SET_LOGIN_ERROR:
      return {
        ...state,
        login_loading: false,
        login_data: null,
        login_error: action.payload,
      };
      case loginActionTypes.CLEAR_LOGIN_DATA:
      return {
        ...state,
        login_loading: false,
        login_data: null,
        login_error: "",
      };
    default:
      return state;
  }
};

const logoutReducer = (state = initialLogoutState, action: any) => {
  switch (action.type) {
    case loginActionTypes.GET_LOGOUT_REQUEST:
      return {
        ...state,
        logout_loading: true,
        logout_data: "",
      };
    case loginActionTypes.SET_LOGOUT_REQUEST:
      return {
        ...state,
        logout_loading: false,
        logout_data: action.payload,
        logout_error: "",
      };
    case loginActionTypes.SET_LOGOUT_ERROR:
      return {
        ...state,
        logout_loading: false,
        logout_data: null,
        logout_error: action.payload,
      };
    default:
      return state;
  }
};

export {loginReducer,logoutReducer};

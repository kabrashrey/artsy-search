import { registerActionTypes } from "./Action";

const initialState = {
  register_data: null,
  register_error: "",
  register_loading: false,
};

const initialDeleteAccountState = {
  del_account_data: null,
  del_account_error: "",
  del_account_loading: false,
};

const registerReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case registerActionTypes.GET_REGISTER_REQUEST:
      return {
        ...state,
        register_loading: true,
        register_data: "",
      };
    case registerActionTypes.SET_REGISTER_REQUEST:
      return {
        ...state,
        register_loading: false,
        register_data: action.payload,
        register_error: "",
      };
    case registerActionTypes.SET_REGISTER_ERROR:
      return {
        ...state,
        register_loading: false,
        register_data: null,
        register_error: action.payload,
      };
    case registerActionTypes.CLEAR_REGISTER_DATA:
      return {
        ...state,
        register_error: "",
        register_data: null,
        register_loading: false,
      };
    default:
      return state;
  }
};

const deleteAccountReducer = (
  state = initialDeleteAccountState,
  action: any
) => {
  switch (action.type) {
    case registerActionTypes.GET_DELETE_ACCOUNT_REQUEST:
      return {
        ...state,
        del_account_loading: true,
        del_account_data: "",
      };
    case registerActionTypes.SET_DELETE_ACCOUNT_REQUEST:
      return {
        ...state,
        del_account_loading: false,
        del_account_data: action.payload,
        del_account_error: "",
      };
    case registerActionTypes.SET_DELETE_ACCOUNT_ERROR:
      return {
        ...state,
        del_account_loading: false,
        del_account_data: null,
        del_account_error: action.payload,
      };
    default:
      return state;
  }
};

export { registerReducer, deleteAccountReducer };

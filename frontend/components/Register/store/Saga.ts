import { call, put, takeLatest } from "redux-saga/effects";
import { registerActionTypes } from "./Action";
import { AnyAction } from "redux-saga";
import { apiUrls } from "../../../src/APIUrls";

// const delay = (ms: number) =>
//   new Promise((resolve) => setTimeout(resolve, ms));

// Worker Saga - API Calls
function* registerSaga(action: AnyAction): Generator<any, void, any> {
  try {
    let url = apiUrls.register;
    const response = yield call(() =>
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action.payload),
      })
    );

    const data = yield response.json();

    if (!response.ok) {
      yield put({
        type: registerActionTypes.SET_REGISTER_ERROR,
        payload: data.message || "Registration failed",
      });
      return;
    }

    localStorage.setItem("user", JSON.stringify(data?.data));

    yield put({
      type: registerActionTypes.SET_REGISTER_REQUEST,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: registerActionTypes.SET_REGISTER_ERROR,
      payload: "An unexpected error occurred",
    });
  }
}


function* deleteAccountSaga(action: AnyAction): Generator<any, void, any> {
  try {
    let url = apiUrls.deleteAccount;
    const response = yield call(() =>
      fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action.payload),
      })
    );

    const data = yield response.json();

    if (!response.ok) {
      yield put({
        type: registerActionTypes.SET_DELETE_ACCOUNT_ERROR,
        payload: data.message || "User Deletion failed",
      });
      return;
    }
    localStorage.removeItem("user");

    yield put({
      type: registerActionTypes.SET_DELETE_ACCOUNT_REQUEST,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: registerActionTypes.SET_DELETE_ACCOUNT_ERROR,
      payload: "An unexpected error occurred",
    });
  }
}

// Watcher Functions
export function* watchRegister() {
  yield takeLatest(registerActionTypes.GET_REGISTER_REQUEST, registerSaga);
}

export function* watchDeleteAccount() {
  yield takeLatest(registerActionTypes.GET_DELETE_ACCOUNT_REQUEST, deleteAccountSaga);
}

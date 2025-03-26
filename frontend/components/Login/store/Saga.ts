import { call, put, takeLatest } from "redux-saga/effects";
import { loginActionTypes } from "./Action";
import { AnyAction } from "redux-saga";
import { apiUrls } from "../../../src/APIUrls";

// const delay = (ms: number) =>
//   new Promise((resolve) => setTimeout(resolve, ms));

// Worker Saga - API Calls
function* loginSaga(action: AnyAction): Generator<any, void, any> {
  try {
    let url = apiUrls.login;

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
        type: loginActionTypes.SET_LOGIN_ERROR,
        payload: data.message || "Login failed",
      });
      return;
    }

    // Store tokens in localStorage
    localStorage.setItem("user", JSON.stringify(data?.data?.user));

    yield put({
      type: loginActionTypes.SET_LOGIN_REQUEST,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: loginActionTypes.SET_LOGIN_ERROR,
      payload: "An unexpected error occurred",
    });
  }
}


function* logoutSaga(action: AnyAction): Generator<any, void, any> {
  try {
    let url = apiUrls.logout;
    const payload = { email: action.payload };

    const response = yield call(() =>
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
    );

    const data = yield response.json();

    if (!response.ok) {
      yield put({
        type: loginActionTypes.SET_LOGOUT_ERROR,
        payload: data.message || "Logout failed",
      });
      return;
    }

    // Clear tokens from localStorage on logout
    localStorage.removeItem("user");

    yield put({
      type: loginActionTypes.SET_LOGOUT_REQUEST,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: loginActionTypes.SET_LOGOUT_ERROR,
      payload: "An unexpected error occurred",
    });
  }
}

// Watcher Functions
export function* watchLogin() {
  yield takeLatest(loginActionTypes.GET_LOGIN_REQUEST, loginSaga);
}

export function* watchLogout() {
  yield takeLatest(loginActionTypes.GET_LOGOUT_REQUEST, logoutSaga);
}

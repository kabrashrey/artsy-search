import { call, put, takeLatest, delay } from "redux-saga/effects";
import { jwtDecode } from "jwt-decode";
import { loginActionTypes } from "./Action";
import { AnyAction } from "redux-saga";
import { apiUrls } from "../../../src/APIUrls";

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
    const accessToken = data?.data?.accessToken;
    const user = data?.data?.user;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", JSON.stringify(accessToken));

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
    localStorage.removeItem("accessToken");

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

export function* checkTokenExpirationSaga(): Generator<any, void, any> {
  const token = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (token && user?.email) {
    try {
      const decoded: { exp: number } = jwtDecode(token);
      const now = Date.now();
      const timeout = decoded.exp * 1000 - now;

      if (timeout <= 0) {
        yield put({
          type: loginActionTypes.GET_LOGOUT_REQUEST,
          payload: user.email,
        });
      } else {
        yield delay(timeout);
        yield put({
          type: loginActionTypes.GET_LOGOUT_REQUEST,
          payload: user.email,
        });
      }
    } catch (err) {
      console.error("Token decode failed:", err);
      yield put({
        type: loginActionTypes.GET_LOGOUT_REQUEST,
        payload: user.email,
      });
    }
  }
}

// Watcher Functions
export function* watchLogin() {
  yield takeLatest(loginActionTypes.GET_LOGIN_REQUEST, loginSaga);
}

export function* watchLogout() {
  yield takeLatest(loginActionTypes.GET_LOGOUT_REQUEST, logoutSaga);
}

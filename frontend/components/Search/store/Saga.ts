import { call, put, takeLatest } from "redux-saga/effects";
import { searchActionTypes, searchActions } from "./Action";
import { AnyAction } from "redux-saga";
import { apiUrls } from "../../../src/APIUrls";

// const delay = (ms: number) =>
//   new Promise((resolve) => setTimeout(resolve, ms));

// Worker Saga - API Calls
function* searchArtistSaga(action: AnyAction): Generator<any, void, any> {
  try {
    let url =
      apiUrls.search +
      `?q=${encodeURIComponent(action.payload)}&size=10&type=artist`;

    const response = yield call(() => fetch(url));
    const data = yield response.json();
    if (!response.ok) {
      yield put({
        type: searchActionTypes.SET_SEARCH_REQUEST_FAILURE,
        payload: data.message || "Artist Search failed",
      });
      return;
    }
    yield put({
      type: searchActionTypes.SET_SEARCH_REQUEST,
      payload: data.data,
    });
  } catch (error: any) {
    yield put(searchActions.setArtistError(error.message));
  }
}

function* getFavSaga(action: AnyAction): Generator<any, void, any> {
  try {
    let url = apiUrls.getFav + `?email=${encodeURIComponent(action.payload)}`;

    const response = yield call(() => fetch(url));

    const data = yield response.json();

    if (!response.ok) {
      yield put({
        type: searchActionTypes.SET_FAV_ERROR,
        payload: data.message || "Fav load failed",
      });
      return;
    }
    yield put({
      type: searchActionTypes.SET_FAV,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: searchActionTypes.SET_FAV_ERROR,
      payload: "An unexpected error occurred",
    });
  }
}

function* addFavSaga(action: AnyAction): Generator<any, void, any> {
  try {
    let url = apiUrls.addFav;

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
        type: searchActionTypes.SET_ADD_FAV_ERROR,
        payload: data.message || "Fav addition failed",
      });
      return;
    }
    yield put({
      type: searchActionTypes.SET_ADD_FAV,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: searchActionTypes.SET_ADD_FAV_ERROR,
      payload: "An unexpected error occurred",
    });
  }
}

function* removeFavSaga(action: AnyAction): Generator<any, void, any> {
  try {
    let url = apiUrls.removeFav;

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
        type: searchActionTypes.SET_REMOVE_FAV_ERROR,
        payload: data.message || "Fav removal failed",
      });
      return;
    }
    yield put({
      type: searchActionTypes.SET_REMOVE_FAV,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: searchActionTypes.SET_REMOVE_FAV_ERROR,
      payload: "An unexpected error occurred",
    });
  }
}

function* artworksSaga(action: AnyAction): Generator<any, void, any> {
  try {
    let url =
      apiUrls.atrworks +
      `?artist_id=${encodeURIComponent(action.payload)}&size=10`;

    const response = yield call(() => fetch(url));
    const data = yield response.json();
    if (!response.ok) {
      yield put({
        type: searchActionTypes.SET_ARTWORKS_ERROR,
        payload: data.message || "Artworks Search failed",
      });
      return;
    }
    yield put({
      type: searchActionTypes.SET_ARTWORKS,
      payload: data.data,
    });
  } catch (error: any) {
    yield put(searchActions.setArtworksError(error.message));
  }
}

function* artistDetailsSaga(action: AnyAction): Generator<any, void, any> {
  try {
    let url =
      apiUrls.artistDetails + `?id=${encodeURIComponent(action.payload)}`;

    const response = yield call(() => fetch(url));
    const data = yield response.json();
    if (!response.ok) {
      yield put({
        type: searchActionTypes.SET_ARTIST_DETAILS_ERROR,
        payload: data.message || "Artist Details Search failed",
      });
      return;
    }
    yield put({
      type: searchActionTypes.SET_ARTIST_DETAILS,
      payload: data.data,
    });
  } catch (error: any) {
    yield put(searchActions.setArtistDetailsError(error.message));
  }
}

function* similarArtistsDetailsSaga(
  action: AnyAction
): Generator<any, void, any> {
  try {
    let url =
      apiUrls.similarArtist +
      `similar?id=${encodeURIComponent(action.payload)}`;

    const response = yield call(() => fetch(url));
    const data = yield response.json();
    if (!response.ok) {
      yield put({
        type: searchActionTypes.SET_SIMILAR_ARTISTS_ERROR,
        payload: data.message || "Similar Artists Search failed",
      });
      return;
    }
    yield put({
      type: searchActionTypes.SET_SIMILAR_ARTISTS,
      payload: data.data,
    });
  } catch (error: any) {
    yield put(searchActions.setSimilarArtistsError(error.message));
  }
}

function* categoriesSaga(action: AnyAction): Generator<any, void, any> {
  try {
    let url =
      apiUrls.categories + `?artwork_id=${encodeURIComponent(action.payload)}`;

    const response = yield call(() => fetch(url));
    const data = yield response.json();
    if (!response.ok) {
      yield put({
        type: searchActionTypes.SET_CATEGORIES_ERROR,
        payload: data.message || "Categories Search failed",
      });
      return;
    }
    yield put({
      type: searchActionTypes.SET_CATEGORIES,
      payload: data.data,
    });
  } catch (error: any) {
    yield put(searchActions.setCategoriesError(error.message));
  }
}

// Watcher Functions
export function* watchSearchArtist() {
  yield takeLatest(searchActionTypes.GET_SEARCH_REQUEST, searchArtistSaga);
}

export function* watchGetFav() {
  yield takeLatest(searchActionTypes.GET_FAV, getFavSaga);
}

export function* watchAddFav() {
  yield takeLatest(searchActionTypes.GET_ADD_FAV, addFavSaga);
}

export function* watchRemoveFav() {
  yield takeLatest(searchActionTypes.GET_REMOVE_FAV, removeFavSaga);
}

export function* watchArtworks() {
  yield takeLatest(searchActionTypes.GET_ARTWORKS, artworksSaga);
}

export function* watchArtistDetails() {
  yield takeLatest(searchActionTypes.GET_ARTIST_DETAILS, artistDetailsSaga);
}

export function* watchSimilarArtistDetails() {
  yield takeLatest(
    searchActionTypes.GET_SIMILAR_ARTISTS,
    similarArtistsDetailsSaga
  );
}

export function* watchCategories() {
  yield takeLatest(searchActionTypes.GET_CATEGORIES, categoriesSaga);
}

import { all, call } from "redux-saga/effects";
import {
  watchSearchArtist,
  watchAddFav,
  watchArtistDetails,
  watchArtworks,
  watchGetFav,
  watchRemoveFav,
  watchSimilarArtistDetails,
  watchCategories,
} from "../../components/Search/store/Saga";
import { watchRegister, watchDeleteAccount } from "../../components/Register/store/Saga";
import { checkTokenExpirationSaga } from "../../components/Login/store/Saga";
import { watchLogin, watchLogout } from "../../components/Login/store/Saga";

export function* RootSaga() {
  yield all([
    watchSearchArtist(),
    watchAddFav(),
    watchArtistDetails(),
    watchArtworks(),
    watchGetFav(),
    watchRemoveFav(),
    watchLogin(),
    watchRegister(),
    watchDeleteAccount(),
    watchLogout(),
    watchSimilarArtistDetails(),
    watchCategories(),
    call(checkTokenExpirationSaga),
  ]);
}

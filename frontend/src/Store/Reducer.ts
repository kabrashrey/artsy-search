import { combineReducers } from "redux";
import {
  searchReducer,
  addFavReducer,
  getFavReducer,
  removeFavReducer,
  artworksReducer,
  artistDetailsReducer,
  similarArtistsReducer,
  categoriesReducer,
} from "../../components/Search/store/Reducer";
import {registerReducer, deleteAccountReducer} from "../../components/Register/store/Reducer";
import {loginReducer, logoutReducer} from "../../components/Login/store/Reducer";

const rootReducer = combineReducers({
  search: searchReducer,
  login: loginReducer,
  register: registerReducer,
  get_fav: getFavReducer,
  add_fav: addFavReducer,
  remove_fav: removeFavReducer,
  artworks: artworksReducer,
  artistDetails: artistDetailsReducer,
  logout: logoutReducer,
  delete_account: deleteAccountReducer,
  similar_artists: similarArtistsReducer,
  categories: categoriesReducer,
});

export default rootReducer;

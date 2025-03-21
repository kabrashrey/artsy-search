import { searchActionTypes } from "./Action";

const initialSearchState = {
  search_loading: false,
  search_data: [],
  search_error: "",
};

const initialGetFavState = {
  fav_loading: false,
  fav_data: null,
  fav_error: "",
};

const initialAddFavState = {
  add_fav_loading: false,
  add_fav_data: null,
  add_fav_error: "",
};

const initialRemoveFavState = {
  removeFav_loading: false,
  removeFav_data: [],
  removeFav_error: null,
};

const initialArtworksState = {
  artworks_loading: false,
  artworks_data: [],
  artworks_error: null,
};

const initialDetailsState = {
  artist_details_loading: false,
  artist_details_data: [],
  artist_details_error: null,
};

const initialSimilarArtistsState = {
  similar_artists_loading: false,
  similar_artists_data: [],
  similar_artists_error: null,
};

const initialCategoriesState = {
  categories_loading: false,
  categories_data: [],
  categories_error: null,
}

const searchReducer = (state = initialSearchState, action: any) => {
  switch (action.type) {
    case searchActionTypes.GET_SEARCH_REQUEST:
      return {
        ...state,
        search_loading: true,
        search_data: "",
      };
    case searchActionTypes.SET_SEARCH_REQUEST:
      return {
        ...state,
        search_loading: false,
        search_data: action.payload,
        search_error: "",
      };
    case searchActionTypes.SET_SEARCH_REQUEST_FAILURE:
      return {
        ...state,
        search_loading: false,
        search_data: null,
        search_error: action.payload,
      };
    case searchActionTypes.CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        search_data: [],
        search_error: "",
      };
    default:
      return state;
  }
};

const getFavReducer = (state = initialGetFavState, action: any) => {
  switch (action.type) {
    case searchActionTypes.GET_FAV:
      return {
        ...state,
        fav_loading: true,
        fav_data: "",
      };
    case searchActionTypes.SET_FAV:
      return {
        ...state,
        fav_loading: false,
        fav_data: action.payload.data,
        fav_error: "",
      };
    case searchActionTypes.SET_FAV_ERROR:
      return {
        ...state,
        fav_loading: false,
        fav_data: null,
        fav_error: action.payload,
      };
    case searchActionTypes.CLEAR_FAV_DATA:
      return {
        ...state,
        fav_data: null,
        fav_error: "",
      };
    default:
      return state;
  }
};

const addFavReducer = (state = initialAddFavState, action: any) => {
  switch (action.type) {
    case searchActionTypes.GET_ADD_FAV:
      return {
        ...state,
        add_fav_loading: true,
        add_fav_data: "",
      };
    case searchActionTypes.SET_ADD_FAV:
      return {
        ...state,
        add_fav_loading: false,
        add_fav_data: action.payload.data,
        add_fav_error: "",
      };
    case searchActionTypes.SET_ADD_FAV_ERROR:
      return {
        ...state,
        add_fav_loading: false,
        add_fav_data: null,
        add_fav_error: action.payload,
      };
    default:
      return state;
  }
};

const removeFavReducer = (state = initialRemoveFavState, action: any) => {
  switch (action.type) {
    case searchActionTypes.GET_REMOVE_FAV:
      return {
        ...state,
        removeFav_loading: true,
        removeFav_data: "",
      };
    case searchActionTypes.SET_REMOVE_FAV:
      return {
        ...state,
        removeFav_loading: false,
        removeFav_data: action.payload.data,
        removeFav_error: "",
      };
    case searchActionTypes.SET_REMOVE_FAV_ERROR:
      return {
        ...state,
        removeFav_loading: false,
        removeFav_error: action.payload,
        removeFav_data: null,
      };
    default:
      return state;
  }
};

const artworksReducer = (state = initialArtworksState, action: any) => {
  switch (action.type) {
    case searchActionTypes.GET_ARTWORKS:
      return {
        ...state,
        artworks_loading: true,
        artworks_data: "",
      };
    case searchActionTypes.SET_ARTWORKS:
      return {
        ...state,
        artworks_loading: false,
        artworks_data: action.payload,
        artworks_error: "",
      };
    case searchActionTypes.SET_ARTWORKS_ERROR:
      return {
        ...state,
        artworks_loading: false,
        artworks_data: null,
        artworks_error: action.payload,
      };
    default:
      return state;
  }
};

const artistDetailsReducer = (state = initialDetailsState, action: any) => {
  switch (action.type) {
    case searchActionTypes.GET_ARTIST_DETAILS:
      return {
        ...state,
        artist_details_loading: true,
        artist_details_data: "",
      };
    case searchActionTypes.SET_ARTIST_DETAILS:
      return {
        ...state,
        artist_details_loading: false,
        artist_details_data: action.payload,
        artist_details_error: "",
      };
    case searchActionTypes.SET_ARTIST_DETAILS_ERROR:
      return {
        ...state,
        artist_details_loading: false,
        artist_details_data: null,
        artist_details_error: action.payload,
      };
    case searchActionTypes.CLEAR_ARTIST_RESULTS:
      return {
        ...state,
        artist_details_data: [],
        artist_details_error: "",
      };
    default:
      return state;
  }
};

const similarArtistsReducer = (
  state = initialSimilarArtistsState,
  action: any
) => {
  switch (action.type) {
    case searchActionTypes.GET_SIMILAR_ARTISTS:
      return {
        ...state,
        similar_artists_loading: true,
        similar_artists_data: "",
      };
    case searchActionTypes.SET_SIMILAR_ARTISTS:
      return {
        ...state,
        similar_artists_loading: false,
        similar_artists_data: action.payload,
        similar_artists_error: "",
      };
    case searchActionTypes.SET_SIMILAR_ARTISTS_ERROR:
      return {
        ...state,
        similar_artists_loading: false,
        similar_artists_data: null,
        similar_artists_error: action.payload,
      };
    case searchActionTypes.CLEAR_SIMILAR_ARTISTS:
      return {
        ...state,
        similar_artists_data: [],
        similar_artists_error: "",
      };
    default:
      return state;
  }
};

const categoriesReducer = (state = initialCategoriesState, action: any) => {
  switch (action.type) {
    case searchActionTypes.GET_CATEGORIES:
      return {
        ...state,
        categories_loading: true,
        categories_data: "",
      };
    case searchActionTypes.SET_CATEGORIES:
      return {
        ...state,
        categories_loading: false,
        categories_data: action.payload,
        categories_error: "",
      };
    case searchActionTypes.SET_CATEGORIES_ERROR:
      return {
        ...state,
        categories_loading: false,
        categories_data: null,
        categories_error: action.payload,
      };
    case searchActionTypes.CLEAR_CATEGORIES:
      return {
        ...state,
        categories_data: [],
        categories_error: "",
      };
    default:
      return state;
  }
}

export {
  searchReducer,
  getFavReducer,
  addFavReducer,
  removeFavReducer,
  artworksReducer,
  artistDetailsReducer,
  similarArtistsReducer,
  categoriesReducer,
};

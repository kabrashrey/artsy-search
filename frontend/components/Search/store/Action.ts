export enum searchActionTypes {
  // SEARCH
  GET_SEARCH_REQUEST = "GET_SEARCH_REQUEST",
  SET_SEARCH_REQUEST = "SET_SEARCH_REQUEST",
  SET_SEARCH_REQUEST_FAILURE = "SET_SEARCH_REQUEST_FAILURE",
  CLEAR_SEARCH_RESULTS = "CLEAR_SEARCH_RESULTS",
  // FAVOURITES
  GET_FAV = "GET_FAV",
  SET_FAV = "SET_FAV",
  SET_FAV_ERROR = "SET_FAV_ERROR",
  CLEAR_FAV_DATA = "CLEAR_FAV_DATA",
  GET_ADD_FAV = "GET_ADD_FAV",
  SET_ADD_FAV = "SET_ADD_FAV",
  SET_ADD_FAV_ERROR = "SET_ADD_FAV_ERROR",
  GET_REMOVE_FAV = "REMOVE_FAV",
  SET_REMOVE_FAV = "SET_REMOVE_FAV",
  SET_REMOVE_FAV_ERROR = "SET_REMOVE_FAV_ERROR",
  CLEAR_REMOVE_FAV = "CLEAR_REMOVE_FAV",
  // ARTIST DETAILS
  GET_ARTIST_DETAILS = "GET_ARTIST_DETAILS",
  SET_ARTIST_DETAILS = "SET_ARTIST_DETAILS",
  SET_ARTIST_DETAILS_ERROR = "SET_ARTIST_DETAILS_ERROR",
  CLEAR_ARTIST_RESULTS = "CLEAR_ARTIST_RESULTS",
  // ARTWORK
  GET_ARTWORKS = "GET_ARTWORKS",
  SET_ARTWORKS = "SET_ARTWORKS",
  SET_ARTWORKS_ERROR = "SET_ARTWORKS_ERROR",
  // SIMILAR ARTISTS
  GET_SIMILAR_ARTISTS = "GET_SIMILAR_ARTISTS",
  SET_SIMILAR_ARTISTS = "SET_SIMILAR_ARTISTS",
  SET_SIMILAR_ARTISTS_ERROR = "SET_SIMILAR_ARTISTS_ERROR",
  CLEAR_SIMILAR_ARTISTS = "CLEAR_SIMILAR_ARTISTS",
  // CATEGORIES
  GET_CATEGORIES = "GET_CATEGORIES",
  SET_CATEGORIES = "SET_CATEGORIES",
  SET_CATEGORIES_ERROR = "SET_CATEGORIES_ERROR",
  CLEAR_CATEGORIES = "CLEAR_CATEGORIES",
}

// Actions
// Search
export const getArtistRequest = (artistName: string) => ({
  type: searchActionTypes.GET_SEARCH_REQUEST,
  payload: artistName,
});

export const setArtistRequest = (results: any) => ({
  type: searchActionTypes.SET_SEARCH_REQUEST,
  payload: results,
});

export const setArtistError = (error: any) => ({
  type: searchActionTypes.SET_SEARCH_REQUEST_FAILURE,
  payload: error,
});

export const clearSearchResults = () => ({
  type: searchActionTypes.CLEAR_SEARCH_RESULTS,
});

// Artist Details
export const getArtistDetails = (id: string) => ({
  type: searchActionTypes.GET_ARTIST_DETAILS,
  payload: id,
});

export const setArtistDetails = (results: any) => ({
  type: searchActionTypes.SET_ARTIST_DETAILS,
  payload: results,
});

export const setArtistDetailsError = (error: any) => ({
  type: searchActionTypes.SET_ARTIST_DETAILS_ERROR,
  payload: error,
});

export const clearArtistDetails = () => ({
  type: searchActionTypes.CLEAR_ARTIST_RESULTS,
});

// Artworks
export const getArtworks = (artistId: string) => ({
  type: searchActionTypes.GET_ARTWORKS,
  payload: artistId,
});

export const setArtworks = (results: any) => ({
  type: searchActionTypes.SET_ARTWORKS,
  payload: results,
});

export const setArtworksError = (error: any) => ({
  type: searchActionTypes.SET_ARTWORKS_ERROR,
  payload: error,
});

// Favourites
//GET
export const getFav = (data: any) => ({
  type: searchActionTypes.GET_FAV,
  payload: data,
});

export const setFav = (data: any) => ({
  type: searchActionTypes.SET_FAV,
  payload: data,
});

export const setFavError = (error: any) => ({
  type: searchActionTypes.SET_FAV_ERROR,
  payload: error,
});

// POST
export const getAddFav = (data: any) => ({
  type: searchActionTypes.GET_ADD_FAV,
  payload: data,
});

export const setAddFav = (data: any) => ({
  type: searchActionTypes.SET_ADD_FAV,
  payload: data,
});

export const setAddFavError = (error: any) => ({
  type: searchActionTypes.SET_ADD_FAV_ERROR,
  payload: error,
});

export const clearFavData = () => ({
  type: searchActionTypes.CLEAR_FAV_DATA,
});

// DELETE
export const getRemoveFav = (data: any) => ({
  type: searchActionTypes.GET_REMOVE_FAV,
  payload: data,
});

export const setRemoveFav = (data: any) => ({
  type: searchActionTypes.SET_REMOVE_FAV,
  payload: data,
});

export const setRemoveFavError = (error: any) => ({
  type: searchActionTypes.SET_REMOVE_FAV_ERROR,
  payload: error,
});

export const clearRemoveFavData = () => ({
  type: searchActionTypes.CLEAR_REMOVE_FAV,
});


// Similar Artists

export const getSimilarArtists = (data: any) => ({
  type: searchActionTypes.GET_SIMILAR_ARTISTS,
  payload: data,
});

export const setSimilarArtists = (data: any) => ({
  type: searchActionTypes.SET_SIMILAR_ARTISTS,
  payload: data,
});

export const setSimilarArtistsError = (error: any) => ({
  type: searchActionTypes.SET_SIMILAR_ARTISTS_ERROR,
  payload: error,
});

export const clearSimilarArtistDetails = () => ({
  type: searchActionTypes.CLEAR_SIMILAR_ARTISTS,
});

// Categories
export const getCategories = (data: any) => ({
  type: searchActionTypes.GET_CATEGORIES,
  payload: data,
});

export const setCategories = (data: any) => ({
  type: searchActionTypes.SET_CATEGORIES,
  payload: data,
});

export const setCategoriesError = (error: any) => ({
  type: searchActionTypes.SET_CATEGORIES_ERROR,
  payload: error,
});

export const clearCategories = () => ({
  type: searchActionTypes.CLEAR_CATEGORIES,
});

export const searchActions = {
  getArtistRequest,
  setArtistRequest,
  setArtistError,
  getFav,
  setFav,
  setFavError,
  getAddFav,
  setAddFav,
  setAddFavError,
  getRemoveFav,
  setRemoveFav,
  setRemoveFavError,
  getArtistDetails,
  setArtistDetails,
  setArtistDetailsError,
  getArtworks,
  setArtworks,
  setArtworksError,
  clearSearchResults,
  clearArtistDetails,
  getSimilarArtists,
  setSimilarArtists,
  setSimilarArtistsError,
  clearSimilarArtistDetails,
  getCategories,
  setCategories,
  setCategoriesError,
  clearCategories,
  clearFavData,
  clearRemoveFavData,
};

const localhost = "https://artsy-shrey-3.wl.r.appspot.com";

export const apiUrls = {
  login: localhost + "/api/users/login",
  logout: localhost + "/api/users/logout",
  register: localhost + "/api/users/register",
  deleteAccount: localhost + "/api/users/delete",
  search: localhost + "/api/search",
  getFav: localhost + "/api/favourites",
  addFav: localhost + "/api/favourites/add",
  removeFav: localhost + "/api/favourites/delete",
  atrworks: localhost + "/api/artworks",
  artistDetails: localhost + "/api/artists",
  similarArtist: localhost + "/api/artists/",
  categories: localhost + "/api/genes",
};

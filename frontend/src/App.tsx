import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import Register from "../components/Register/Register";
import Search from "../components/Search/Search";
import Login from "../components/Login/Login";
import Favorites from "../components/Favorites/Favorites";
import ArtistTabs from "../components/Search/ArtistTabs";
import SimilarArtist from "../components/Search/SimilarArtist";

function App() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const accessToken = localStorage.getItem("accessToken");
  //   const refreshToken = localStorage.getItem("refreshToken");
  //   if (accessToken && refreshToken) {
  //     const user = JSON.parse(localStorage.getItem("user") || "{}");
  //     dispatch(
  //       loginActions.setLoginRequest({
  //         accessToken,
  //         refreshToken,
  //         user,
  //       })
  //     );
  //   }
  // }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/artist/:artistId" element={<ArtistTabs />} />
          <Route
            path="/similar_artists/:artistId"
            element={<SimilarArtist />}
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

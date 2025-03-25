import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import Register from "../components/Register/Register";
import Search from "../components/Search/Search";
import Login from "../components/Login/Login";
import Favorites from "../components/Favorites/Favorites";
import ArtistTabs from "../components/Search/ArtistTabs";
import SimilarArtist from "../components/Search/SimilarArtist";
import { useStarredArtists } from "./useStarredArtists";
import { NotificationProvider } from "../components/Notification/NotificationContext";
import NotificationContainer from "../components/Notification/NotificationContainer";

function App() {
  const ArtistTabsWrapper: React.FC = () => {
    const { artistId } = useParams<{ artistId: string }>();
    const [activeTab, setActiveTab] = useState("artist-info");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const { starredArtists, handleStarClick } = useStarredArtists();

    if (!artistId) {
      return <div>Artist ID is required</div>;
    }

    return (
      <ArtistTabs
        artistId={artistId}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        starredArtists={starredArtists}
        handleStarClick={handleStarClick}
      />
    );
  };

  const SimilarArtistWrapper: React.FC = () => {
    const [activeTab, setActiveTab] = useState("artist-info");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const { starredArtists, handleStarClick } = useStarredArtists();

    return (
      <SimilarArtist
        similar_artists={[]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        starredArtists={starredArtists}
        handleStarClick={handleStarClick}
      />
    );
  };

  return (
    <NotificationProvider>
      <Router>
        <Navbar />
        <NotificationContainer />
        <main>
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/artist/:artistId" element={<ArtistTabsWrapper />} />
            <Route
              path="/similar_artists/:artistId"
              element={<SimilarArtistWrapper />}
            />
          </Routes>
        </main>
        <Footer />
      </Router>
    </NotificationProvider>
  );
}

export default App;

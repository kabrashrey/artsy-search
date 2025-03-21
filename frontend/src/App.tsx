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

function App() {
  const ArtistTabsWrapper: React.FC = () => {
    const { artistId } = useParams<{ artistId: string }>();
    const [activeTab, setActiveTab] = useState("artist-info");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!artistId) {
      return <div>Artist ID is required</div>;
    }

    return (
      <ArtistTabs
        artistId={artistId}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
      />
    );
  };

  const SimilarArtistWrapper: React.FC = () => {
    const { artistId } = useParams<{ artistId: string }>();
    const [activeTab, setActiveTab] = useState("artist-info");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!artistId) {
      return <div>Artist ID is required</div>;
    }

    return (
      <SimilarArtist
        similar_artists={[]} // Replace with actual similar artists data
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
      />
    );
  };

  return (
    <Router>
      <Navbar />
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
  );
}

export default App;

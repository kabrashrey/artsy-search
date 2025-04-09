import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  ButtonGroup,
  Spinner,
  Alert,
} from "react-bootstrap";

import { searchActions } from "./store/Action";
import ArtistTabs from "./ArtistTabs";
import SimilarArtist from "./SimilarArtist";
import { useNotification } from "../Notification/NotificationContext";
import artsy_logo from "../../assets/artsy_logo.svg";
import "./SearchStyles.scss";

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("artist-info");
  const [artistName, setArtistName] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [starredArtists, setStarredArtists] = useState<string[]>([]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const email = user?.email;

  const { search_loading, search_data } = useSelector(
    (state: any) => state.search
  );
  const { similar_artists_data } = useSelector(
    (state: any) => state.similar_artists
  );
  const { fav_data } = useSelector((state: any) => state.get_fav);

  const handleClear = () => {
    setArtistName("");
    setSelectedArtist(null);
    setSearchPerformed(false);
    dispatch(searchActions.clearSearchResults());
    localStorage.removeItem("selectedArtist");
    navigate("/", { replace: true, state: {} });
    setActiveTab("artist-info");
  };

  const handleSearch = () => {
    if (artistName.trim()) {
      setSelectedArtist(null);
      setSearchPerformed(true);
      dispatch(searchActions.getArtistRequest(artistName));
    }
    if (Object.keys(user).length > 0) {
      dispatch(searchActions.getFav(email));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleArtistClick = (artistId: string) => {
    setSelectedArtist(artistId);
    dispatch(searchActions.getArtistDetails(artistId));
    if (Object.keys(user).length > 0) {
      dispatch(searchActions.getSimilarArtists(artistId));
    }
    localStorage.setItem("selectedArtist", JSON.stringify(artistId));
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleStarClick = (artist: string, isStarred: boolean) => {
    const updatedStarredArtists = isStarred
      ? starredArtists.filter((id) => id !== artist)
      : [...starredArtists, artist];

    setStarredArtists(updatedStarredArtists);
    if (isStarred) {
      dispatch(
        searchActions.getRemoveFav({
          fav_id: artist,
          email: email,
        })
      );
      addNotification("Removed from favorites", "danger");
    } else {
      dispatch(
        searchActions.getAddFav({
          fav_id: artist,
          email: email,
        })
      );
      addNotification("Added to favorites", "success");
    }
    setTimeout(() => {
      dispatch(searchActions.getFav(email));
    }, 1000);
  };

  useEffect(() => {
    if (location.state?.logout) {
      handleClear();
    }
  }, [location.state]);

  useEffect(() => {
    if (location.state?.artistId) {
      setSelectedArtist(location.state.artistId);
      dispatch(searchActions.getArtistDetails(location.state.artistId));
      dispatch(searchActions.clearSearchResults());
      setArtistName("");
      setSearchPerformed(false);
    }
  }, [location.state, dispatch]);

  useEffect(() => {
    const savedArtist = localStorage.getItem("selectedArtist");
    if (savedArtist) {
      const artistId = JSON.parse(savedArtist);
      setSelectedArtist(artistId);
      dispatch(searchActions.getArtistDetails(artistId));
      dispatch(searchActions.getFav(email));
      if (Object.keys(user).length > 0) {
        dispatch(searchActions.getSimilarArtists(artistId));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (fav_data) {
      const favoriteIds = fav_data.map((fav: any) => fav.fav_id);
      setStarredArtists(favoriteIds);
    }
  }, [fav_data]);

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-10">
        <InputGroup
          className="mb-2 py-4 rounded-pill w-80"
          style={{ maxWidth: "90%", padding: 0 }}
        >
          <Form.Control
            name="artistName"
            placeholder="Please enter an artist name."
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <ButtonGroup>
            <Button
              type="submit"
              className="custom-btn"
              disabled={search_loading || !artistName}
              onClick={handleSearch}
            >
              {search_loading ? (
                <>
                  Search{" "}
                  <Spinner
                    as="span"
                    animation="border"
                    role="status"
                    aria-hidden="true"
                    variant="light"
                    size="sm"
                  />
                </>
              ) : (
                "Search"
              )}
            </Button>
            <Button variant="secondary" onClick={handleClear}>
              Clear
            </Button>
          </ButtonGroup>
        </InputGroup>
      </div>

      {/* Search Results */}
      <Container style={{ maxWidth: "90%" }}>
        {searchPerformed && (
          <>
            {search_data?.length === 0 && !search_loading ? (
              <Alert key="danger" variant="danger">
                No results.
              </Alert>
            ) : (
              <Row className="d-flex overflow-auto pb-3">
                {search_data &&
                  search_data?.map((artist: any) => {
                    const isStarred = starredArtists.includes(artist.id);
                    return (
                      <Col
                        key={artist.id}
                        className="d-flex justify-content-center align-self-start"
                      >
                        <Card
                          className={`custom-card ${
                            selectedArtist === artist.id ? "selected" : ""
                          }`}
                          onClick={() => {
                            handleArtistClick(artist.id);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          {Object.keys(user).length > 0 ? (
                            <div
                              className="star-icon-wrapper"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStarClick(artist?.id, isStarred);
                              }}
                            >
                              <FontAwesomeIcon
                                icon={isStarred ? solidStar : regularStar}
                                style={{
                                  color: isStarred ? "gold" : "white",
                                  cursor: "pointer",
                                  fontSize: "20px",
                                }}
                              />
                            </div>
                          ) : null}
                          <Card.Img
                            variant="top"
                            src={artist.thumbnail || artsy_logo}
                            alt={artist.title}
                          />
                          <Card.Body className="custom-card-body text-white">
                            <Card.Text>{artist.title}</Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })}
              </Row>
            )}
          </>
        )}
        {/* Artist Details (Displayed Below Results) */}
        {selectedArtist && (
          <ArtistTabs
            artistId={selectedArtist}
            activeTab={activeTab}
            setActiveTab={handleTabChange}
            user={user}
            starredArtists={starredArtists}
            handleStarClick={handleStarClick}
          />
        )}
        {/* Similar Artist */}
        {selectedArtist && (
          <SimilarArtist
            similar_artists={similar_artists_data}
            activeTab={activeTab}
            user={user}
            starredArtists={starredArtists}
            handleStarClick={handleStarClick}
            handleArtistClick={handleArtistClick}
            setSelectedArtist={setSelectedArtist}
            selectedArtist={selectedArtist}
          />
        )}
      </Container>
    </>
  );
};

export default Search;

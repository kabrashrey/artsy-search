import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Card,
  Button,
  Alert,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import { getArtistDetails, getRemoveFav, getFav } from "../Search/store/Action";
import "./FavoritesStyles.scss";

const Favorites = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { login_data } = useSelector((state: any) => state.login);

  const { fav_data, fav_error, fav_loading } = useSelector(
    (state: any) => state.get_fav
  );
  const [localFavorites, setLocalFavorites] = useState(fav_data || []);

  // Load favorites only on full reload
  useEffect(() => {
    if (login_data && !localFavorites.length) {
      dispatch(getFav(login_data?.data?.user?.email));
    }
  }, [dispatch, login_data, localFavorites.length]);

  // Sync local state when fav_data changes
  useEffect(() => {
    if (fav_data) {
      setLocalFavorites(fav_data);
    }
  }, [fav_data]);

  const handleRemove = (artistId: string) => {
    dispatch(getRemoveFav(artistId));
    setLocalFavorites((prev: any) =>
      prev.filter((artist: any) => artist.id !== artistId)
    );
  };

  const handleCardClick = (artist: any) => {
    dispatch(getArtistDetails(artist));
    navigate("/", {
      state: { artistId: artist },
    });
  };

  const getTimeAgo = (timestamp: string) => {
    const diff = Math.floor(
      (new Date().getTime() - new Date(timestamp).getTime()) / 1000
    );
    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  };

  return (
    <Container className="py-4">
      {fav_loading && !localFavorites.length ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : localFavorites.length > 0 ? (
        <Row>
          {localFavorites.map((artist: any) => (
            <Col key={artist.fav_id} md={4} lg={3} className="mb-4">
              <Card
                className="favorite-card"
                onClick={() => handleCardClick(artist.fav_id)}
              >
                <div
                  className="background-img"
                  style={{
                    background: `url(${artist.bg_img}) center/cover no-repeat`,
                    filter: "blur(8px)",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  }}
                />
                {/* <div
                  className="overlay"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "rgba(0, 0, 0, 0.4)",
                    zIndex: 0,
                  }}
                /> */}

                <Card.Body
                  className="favorite-card-body"
                  style={{
                    position: "relative",
                    color: "white",
                    font: "bold",
                  }}
                >
                  <h5>{artist.name}</h5>
                  <p>
                    {artist.birthyear} - {artist.deathyear || ""}
                    <br />
                    {artist.nationality}
                  </p>
                  <small>{getTimeAgo(artist.added_at)}</small>
                  {/* Remove Link (Bottom-Right) */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      right: "10px",
                    }}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card click navigation
                        handleRemove(artist.fav_id);
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        color: "white",
                        fontSize: "12px",
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Alert key="danger" variant="danger" className="text-center">
          No favorites.
        </Alert>
      )}
    </Container>
  );
};

export default Favorites;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Card, Alert, Row, Col, Spinner } from "react-bootstrap";
import { getArtistDetails, getRemoveFav, getFav } from "../Search/store/Action";

const Favorites = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const { fav_data, fav_loading } = useSelector((state: any) => state.get_fav);
  const { removeFav_data } = useSelector((state: any) => state.remove_fav);
  const [localFavorites, setLocalFavorites] = useState(fav_data || []);
  const [timeAgo, setTimeAgo] = useState<{ [key: string]: string }>({});

  const getTimeAgo = (timestamp: string) => {
    const diff = Math.floor(
      (new Date().getTime() - new Date(timestamp).getTime()) / 1000
    );
    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  };

  const handleRemove = (artistId: string) => {
    dispatch(getRemoveFav({ fav_id: artistId, email: user?.email }));
    setLocalFavorites((prev: any) =>
      prev.filter((artist: any) => artist.fav_id !== artistId)
    );
    dispatch(getFav(user?.email));
  };

  const handleCardClick = (artist: any) => {
    dispatch(getArtistDetails(artist));
    navigate("/", {
      state: { artistId: artist },
    });
  };

  // Load favorites only on full reload
  useEffect(() => {
    if (Object.keys(user).length > 0 && !localFavorites.length) {
      dispatch(getFav(user?.email));
    }
  }, [dispatch, localFavorites.length]);

  // Sync local state when fav_data changes
  useEffect(() => {
    if (fav_data) {
      setLocalFavorites(fav_data);
    }
  }, [fav_data]);

  useEffect(() => {
    if (removeFav_data) {
      dispatch(getFav(user?.email));
    }
  }, [removeFav_data]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo((prevTimeAgo) => {
        const updatedTimeAgo = { ...prevTimeAgo };
        localFavorites.forEach((artist: any) => {
          updatedTimeAgo[artist.fav_id] = getTimeAgo(artist.added_at);
        });
        return updatedTimeAgo;
      });
    }, 1000);
    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [localFavorites]);

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
                    background: `url(${
                      artist.bg_img || "./assets/artsy_logo.svg"
                    }) center/cover no-repeat`,
                    filter: "blur(8px)",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  }}
                />

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
                  <small>
                    {timeAgo[artist.fav_id] || getTimeAgo(artist.added_at)}
                  </small>
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

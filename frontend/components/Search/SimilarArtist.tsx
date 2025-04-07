import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";

import artsy_logo from "../../assets/artsy_logo.svg";
import "./SearchStyles.scss";

interface SimilarArtistProps {
  similar_artists: any;
  activeTab: string;
  user: any;
  starredArtists: string[];
  handleStarClick: any;
  handleArtistClick: any;
  setSelectedArtist: any;
  selectedArtist: string | null;
}

const SimilarArtist: React.FC<SimilarArtistProps> = ({
  similar_artists,
  activeTab,
  user,
  starredArtists,
  handleStarClick,
  handleArtistClick,
  setSelectedArtist,
  selectedArtist,
}) => {
  return (
    <>
      <Container>
        {user &&
          Object.keys(user).length > 0 &&
          activeTab === "artist-info" &&
          similar_artists &&
          similar_artists.length > 0 && (
            <>
              <h3>Similar Artists</h3>
              <Row className="d-flex-similar overflow-auto">
                {similar_artists.map((artist: any) => {
                  const isStarred =
                    starredArtists.find((id) => id === artist.id) !== undefined;
                  return (
                    <Col
                      key={artist.id}
                      className="d-flex-similar justify-content-center"
                    >
                      <Card
                        className={`${
                          selectedArtist === artist.id ? "selected" : ""
                        } custom-card-similar`}
                        onClick={() => {
                          handleArtistClick(artist.id);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        {Object.keys(user).length > 0 && (
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
                        )}
                        <Card.Img
                          variant="top"
                          src={artist.thumbnail || artsy_logo}
                          alt={artist.name}
                          className="fixed-img"
                        />
                        <Card.Body className="text-white custom-card-similar-body">
                          <p className="artist-name">{artist.name}</p>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </>
          )}
      </Container>
    </>
  );
};

export default SimilarArtist;

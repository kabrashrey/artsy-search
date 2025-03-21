import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";

import { searchActions } from "./store/Action";
import "./SearchStyles.scss";

interface SimilarArtistProps {
  similar_artists: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: any;
}

const SimilarArtist: React.FC<SimilarArtistProps> = ({
  similar_artists,
  activeTab,
  setActiveTab,
  user,
}) => {
  const dispatch = useDispatch();
  const [isStarred, setIsStarred] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);
  const handleArtistClick = (artistId: string) => {
    setSelectedArtist(artistId);
    dispatch(searchActions.getArtistDetails(artistId));
    dispatch(searchActions.getSimilarArtists(artistId));
  };
  return (
    <>
      <Container>
        {user && Object.keys(user).length > 0 && (
          <Row className="d-flex-similar overflow-auto">
            {similar_artists &&
              activeTab == "artist-info" &&
              similar_artists.map((artist: any) => {
                // isStarred = !!fav_data?.[artist.id];
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
                    >
                      {Object.keys(user).length > 0 && (
                        <div
                          className="star-icon-wrapper"
                          // onClick={(e) => {
                          //   e.stopPropagation();
                          //   handleStarClick(artist);
                          // }}
                        >
                          <FontAwesomeIcon
                            icon={isStarred ? solidStar : regularStar}
                            className="star-icon"
                          />
                        </div>
                      )}
                      <Card.Img
                        variant="top"
                        src={artist.thumbnail || "./assets/artsy_logo.svg"}
                        alt={artist.name}
                        className="fixed-img"
                      />
                      <Card.Body
                        className="text-white custom-card-similar-body"
                        // style={{ backgroundColor: "#205375" }}
                      >
                        {/* <Card.Text className="custom-card-similar-body">{artist.name}</Card.Text> */}
                        <p className="artist-name">{artist.name}</p>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
          </Row>
        )}
      </Container>
    </>
  );
};

export default SimilarArtist;

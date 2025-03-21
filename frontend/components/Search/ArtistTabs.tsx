import React, { useEffect, useState } from "react";
import {
  Nav,
  Spinner,
  Alert,
  Row,
  Col,
  Card,
  Button,
  Modal,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getArtworks, getCategories } from "./store/Action";

interface ArtistTabsProps {
  artistId: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: any;
}

const ArtistTabs: React.FC<ArtistTabsProps> = ({
  artistId,
  activeTab,
  setActiveTab,
  user,
}) => {
  const dispatch = useDispatch();

  const [isStarred, setIsStarred] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [artworkTitle, setArtworkTitle] = useState("");
  const [artworkYear, setArtworkYear] = useState("");
  const [artworkImg, setArtworkImg] = useState("");

  const { artist_details_loading, artist_details_data, artist_details_error } =
    useSelector((state: any) => state.artistDetails);
  const { artworks_data, artworks_error, artworks_loading } = useSelector(
    (state: any) => state.artworks
  );
  const { categories_data, categories_error, categories_loading } = useSelector(
    (state: any) => state.categories
  );

  const handleSelect = (selectedKey: string | null) => {
    if (selectedKey) {
      setActiveTab(selectedKey);
    }
  };

  const handleCategories = (
    artwork_id: string,
    title: string,
    date: string,
    img: string
  ) => {
    setArtworkTitle(title);
    setArtworkYear(date);
    setArtworkImg(img);
    dispatch(getCategories(artwork_id));
    setShowModal(true);
  };

  // const handleStarClick = (payload: any) => {
  //   setIsStarred((prev) => !prev);
  //   // Implement logic to save/remove from favorites
  // };

  useEffect(() => {
    if (activeTab === "artworks") {
      dispatch(getArtworks(artistId));
    }
  }, [activeTab, artistId, dispatch]);

  // useEffect(() => {
  //   if (artistId) {
  //     dispatch(getArtistDetails(artistId));
  //     dispatch(getArtworks(artistId));
  //   }
  // }, [artistId, dispatch]);

  return (
    <>
      <div>
        {artist_details_data && !artist_details_error && (
          <Nav
            fill
            variant="pills"
            activeKey={activeTab}
            onSelect={handleSelect}
          >
            <Nav.Item>
              <Nav.Link eventKey="artist-info" className="text-blue">
                Artist Info
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="artworks" className="text-blue">
                Artworks
              </Nav.Link>
            </Nav.Item>
          </Nav>
        )}
      </div>

      <div className="d-flex flex-column align-items-center text-center mt-3">
        {artist_details_loading ? (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        ) : (
          activeTab === "artist-info" &&
          artist_details_data && (
            <div>
              <div style={{ fontSize: "1.5rem" }}>
                {artist_details_data.name} {""}
                {Object.keys(user).length > 0 && (
                  <FontAwesomeIcon
                    icon={isStarred ? solidStar : regularStar}
                    className="star-icon-artist-details"
                    // onClick={() => handleStarClick(artist_details_data)}
                  />
                )}
              </div>
              <h4 style={{ fontSize: "1rem" }}>
                {artist_details_data.nationality} (
                {artist_details_data.birthyear} -{" "}
                {artist_details_data.deathyear || "Present"})
              </h4>
              {artist_details_data.biography
                .replace(/(\w+)-\s+(\w+)/g, "$1$2") // Fixes split words like "Cub- ism" → "Cubism"
                .split(/\n\s*\n/) // Ensures proper paragraph separation
                .map((paragraph: any, index: any) => (
                  <p key={index} style={{ textAlign: "justify" }}>
                    {paragraph}
                  </p>
                ))}
            </div>
          )
        )}

        {activeTab === "artworks" && (
          <div className="w-100">
            {artworks_loading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : artworks_error ? (
              <Alert variant="danger">{artworks_error}</Alert>
            ) : artworks_data && artworks_data.length === 0 ? (
              <Alert variant="danger">No Artworks.</Alert>
            ) : (
              <Row>
                {artworks_data.map((artwork: any, index: number) => (
                  <Col key={index} md={4} lg={3} className="mb-4">
                    <Card className="artwork-card">
                      <Card.Img
                        variant="top"
                        src={artwork?.thumbnail_href}
                        alt={artwork?.title}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <Card.Body>
                        <Card.Title>{artwork?.title}</Card.Title>
                        <Card.Text>{artwork?.date}</Card.Text>
                        <Button
                          variant="light"
                          className="w-100"
                          onClick={() =>
                            handleCategories(
                              artwork?.id,
                              artwork?.title,
                              artwork?.date,
                              artwork?.thumbnail_href
                            )
                          }
                        >
                          View categories
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </div>
        )}
      </div>

      {/* Categories Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="d-flex align-items-center">
              <img
                src={artworkImg}
                alt={artworkTitle}
                style={{ width: "50px", height: "auto" }}
              />
              <div style={{ marginLeft: "5px" }}>
                <p className="mb-1" style={{ fontSize: "0.8em" }}>
                  {artworkTitle}
                </p>
                <p className="mb-1" style={{ fontSize: "0.8em" }}>
                  {artworkYear}
                </p>
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {categories_loading ? (
            <div className="d-flex justify-content-center align-items-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : categories_data.length > 0 ? (
            <Row>
              {categories_data.map((category: any, index: any) => (
                <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-3">
                  <Card className="text-center w-100">
                    <Card.Body>
                      <Card.Img
                        variant="top"
                        src={category.thumbnail_href}
                        alt={category.name}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <Card.Text className="mt-3">{category.name}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <Alert variant="warning">No categories found.</Alert>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ArtistTabs;

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import React from "react";
import "./FooterStyles.scss";

const Footer = () => {
  return (
    <footer className="footer text-white text-center fixed-bottom">
      <Container>
        <Row className="justify-content-center align-items-center g-2">
          <Col
            xs={12}
            md="auto"
            className="mb-md-0 d-flex justify-content-center align-items-center gap-2"
          >
            <a
              href="https://www.artsy.net"
              className="text-white align-items-center gap-2"
              aria-label="Visit Artsy"
            >
              <span className="fs-6 fs-md-5">Powered by </span>
              <img
                src="./assets/artsy_logo.svg"
                alt="ArtsyLogo"
                className="footer-logo"
              />
              <span className="fs-6 fs-md-5"> Artsy.</span>
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

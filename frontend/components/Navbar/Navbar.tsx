import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { loginActions } from "../Login/store/Action";
import { registerActions } from "../Register/store/Action";
import { searchActions } from "../Search/store/Action";
import { useNotification } from "../Notification/NotificationContext";
import "./NavbarStyles.scss";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const [activeLink, setActiveLink] = useState<string | null>(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [logout, setLogout] = useState(false);
  const { logout_data } = useSelector((state: any) => state.logout);
  const { del_account_data } = useSelector(
    (state: any) => state.delete_account
  );

  const handleLogout = () => {
    dispatch(loginActions.getLogoutRequest(user?.email));
    dispatch(loginActions.clearLoginData());
    dispatch(searchActions.clearSearchResults());
    dispatch(searchActions.clearFavData());
    dispatch(registerActions.clearRegisterData());
    setLogout(true);
    navigate("/", { state: { logout: logout } });
    addNotification("Logged out", "success");
  };

  const handleDeleteAccount = () => {
    dispatch(registerActions.getDeleteAccountRequest({ email: user?.email }));
    dispatch(loginActions.clearLoginData());
    dispatch(searchActions.clearSearchResults());
    dispatch(searchActions.clearFavData());
    dispatch(registerActions.clearRegisterData());
    setLogout(true);
    navigate("/", { state: { logout: logout } });
    addNotification("Account deleted", "danger");
  };

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      dispatch(loginActions.clearLoginData());
      dispatch(searchActions.clearSearchResults());
      setLogout(true);
      navigate("/", { state: { logout: logout } });
    }
  }, [logout_data || del_account_data]);

  useEffect(() => {
    const currentPath = location.pathname;
    setActiveLink(currentPath);
  }, [location.pathname]);

  return (
    <>
      <Navbar expand="lg" className="navbar bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand>Artist Search</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link
                as={Link}
                to="/"
                className={`navbar-nav-item ${
                  activeLink === "/" ? "active-link" : ""
                }`}
              >
                Search
              </Nav.Link>

              {Object.keys(user).length > 0 ? (
                <>
                  <Nav.Link
                    as={Link}
                    to="/favorites"
                    className={`navbar-nav-item ${
                      activeLink === "/favorites" ? "active-link" : ""
                    }`}
                  >
                    Favorites
                  </Nav.Link>
                  <Dropdown className="me-3">
                    <Dropdown.Toggle
                      variant="light"
                      id="dropdown-basic"
                      style={{ background: "#eeeff2", border: "none" }}
                    >
                      <img
                        src={user?.avatar}
                        alt="User Avatar"
                        width="30"
                        height="30"
                        className="rounded-circle"
                        style={{ marginRight: "10px" }}
                      />
                      {user?.name}
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end">
                      <Dropdown.Item
                        onClick={handleDeleteAccount}
                        className="text-danger"
                      >
                        Delete Account
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={handleLogout}>
                        Log Out
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                <>
                  <Nav.Link
                    as={Link}
                    to="/login"
                    className={`navbar-nav-item ${
                      activeLink === "/login" ? "active-link" : ""
                    }`}
                  >
                    Log in
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/register"
                    className={`navbar-nav-item ${
                      activeLink === "/register" ? "active-link" : ""
                    }`}
                  >
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Card } from "react-bootstrap";
import { loginActions } from "./store/Action";
import { useNotification } from "../Notification/NotificationContext";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const prefilledData = location.state || {};
  const { addNotification } = useNotification();

  const [credentials, setCredentials] = useState({
    email: prefilledData.email || "",
    password: prefilledData.password || "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { login_data, login_error } = useSelector((state: any) => state.login);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]:
        name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "Email must be valid."
          : name === "password" && value.trim() === ""
          ? "Password is required."
          : "",
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let newErrors: any = {};

    if (!credentials.email.trim()) {
      newErrors.email = "Email must be valid.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) {
      newErrors.email = "Email must be valid.";
    }
    if (!credentials.password.trim()) {
      newErrors.password = "Password is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    dispatch(loginActions.getLoginRequest(credentials));
  };

  useEffect(() => {
    if (login_data) {
      setIsLoggedIn(true);
      addNotification("Logged In", "success");
      navigate("/", {
        state: { isLoggedIn: true, email: credentials.email },
      });
    }
  }, [login_data, navigate]);

  useEffect(() => {
    if (login_error) {
      setErrors((prevErrors) => ({ ...prevErrors, password: login_error }));
    }
  }, [login_error]);


  const isFormValid =
    credentials.email.trim() !== "" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email) &&
    credentials.password.trim() !== "";

  return (
    <Container className="d-grid justify-content-center align-items-center py-3 mt-5">
      <div className="text-center">
        <Card style={{ width: "350px", padding: "20px", textAlign: "left" }}>
          <h1 className="mb-4">Login</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                required
                isInvalid={!!errors.email}
                placeholder="Enter email"
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                isInvalid={!!errors.password}
                placeholder="Password"
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button
                type="submit"
                className="w-100 custom-btn"
                disabled={!isFormValid}
              >
                Log in
              </Button>
            </div>
          </Form>
        </Card>
        <p>
          Dont have an account yet? <Link to="/register">Register</Link>
        </p>
      </div>
    </Container>
  );
};

export default Login;

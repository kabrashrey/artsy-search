import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Container, Card } from "react-bootstrap";
import "./RegisterStyles.scss";
import { registerActions } from "./store/Action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  let { register_data, register_error } = useSelector(
    (state: any) => state.register
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]:
        name === "name" && value.trim() === ""
          ? "Full Name is required."
          : name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "Email must be valid."
          : name === "password" && value.trim().length < 1
          ? "Password is required."
          : "",
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    dispatch(registerActions.clearRegisterData());

    let newErrors: any = {};
    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email must be valid.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email must be valid.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    dispatch(registerActions.getRegisterRequest(formData));
  };

  useEffect(() => {
    setIsFormValid(
      formData.name.trim() !== "" &&
        formData.email.trim() !== "" &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
        formData.password.trim().length >= 1
    );
  }, [formData]);

  useEffect(() => {
    if (register_error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: register_error,
      }));
    }
  }, [register_error]);

  useEffect(() => {
    if (register_data) {
      // setIsLoggedIn(true);
      navigate("/", {
        state: { email: formData.email, password: formData.password },
      });
    }
  }, [register_data]);

  return (
    <Container className="d-grid justify-content-center align-items-center py-3 mt-5">
      <div className="text-center">
        <Card style={{ width: "350px", padding: "20px", textAlign: "left" }}>
          <h1 className="mb-4">Register</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Fullname</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                isInvalid={!!errors.name}
                placeholder="John Doe"
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
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
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Password"
                isInvalid={!!errors.password}
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
                onClick={handleSubmit}
              >
                Register
              </Button>
            </div>
          </Form>
        </Card>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </Container>
  );
};

export default Registration;

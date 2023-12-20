import React, { useState, useEffect } from "react";
import "./registration.css";
import { useNavigate } from "react-router-dom";

function Registration() {
  const initialValues = { username: "", email: "", password: "", confirmPassword: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
      navigate("/", { state: { successMessage: "Registration successful!" } });
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    } else if (values.username.length < 3) {
      errors.username = "Username must be more than 3 characters";
    } else if (values.username.length > 30) {
      errors.username = "Username cannot exceed more than 30 characters";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 10) {
      errors.password = "Password must be more than 10 characters";
    } else if (values.password.length > 15) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  return (
    <div className="container">
      {/* {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="success-message">Signed in successfully</div>
      ) : (
        <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      )} */}

      <form className="form-container" onSubmit={handleSubmit}>
        <h1 className="form-header">Registration Form</h1>
        
        <div className="form-group">
          <label className="form-label" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-input"
            placeholder="Username"
            value={formValues.username}
            onChange={handleChange}
          />
          <p className="error-message" htmlFor="username">
            {formErrors.username}
          </p>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            className="form-input"
            placeholder="Email"
            value={formValues.email}
            onChange={handleChange}
          />
          <p className="error-message" htmlFor="email">
            {formErrors.email}
          </p>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-input"
            placeholder="Password"
            value={formValues.password}
            onChange={handleChange}
          />
          <p className="error-message" htmlFor="password">
            {formErrors.password}
          </p>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="form-input"
            placeholder="Confirm Password"
            value={formValues.confirmPassword}
            onChange={handleChange}
          />
          <p className="error-message" htmlFor="confirmPassword">
            {formErrors.confirmPassword}
          </p>
        </div>

        <div className="form-group">
          <button className="submit-button" type="submit">
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Registration;

import React, { useContext, useState, useEffect } from "react";
import "./Login.css";
import "./LoginForm.css";
import { LinkContainer } from "react-router-bootstrap";
import { FloatingLabel, Form } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Icon from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import ReactGA from "react-ga";

const LoginPage = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  let { loginUser, user } = useContext(AuthContext);
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const handlePassToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  const loginPanel = (
    <div>
      <div className="login-card">
        <div id="text-1">
          <span>Welcome</span>
          <span> to the Rhyming World!</span>
        </div>
        <div id="text-2">
          <div>Login to add words</div>
        </div>
        {/* Login Form */}
        <Form onSubmit={loginUser}>
          <FloatingLabel
            controlId="floatingInput"
            label="Enter your username"
            className="login-label"
          >
            <Form.Control
              type="text"
              placeholder="name@example.com"
              name="username"
              className="login-input"
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingPassword"
            label="Password"
            className="login-label"
          >
            <Icon
              onClick={handlePassToggle}
              icon={icon}
              size={22}
              className="password-icon"
            />
            <Form.Control
              type={type}
              placeholder="Password"
              name="password"
              required
              className="login-input"
            />
          </FloatingLabel>
          <button className="login-button" type="submit">
            Sign in
          </button>
        </Form>
        {/* Login Form */}
        {/* <LinkContainer to="/reset-password/">
          <div id="text-4">Having trouble in sign in?</div>
        </LinkContainer> */}

        <div id="text-5">
          <span>Don't have an account?&nbsp;</span>
          <span>
            <LinkContainer to="/sign-up">
              <strong>Request Now</strong>
            </LinkContainer>
          </span>
        </div>
      </div>
    </div>
  );
  const path = useNavigate();
  return (
    <>
      {user === null && loginPanel}
      {user && path("/")}
    </>
  );
};

export default LoginPage;

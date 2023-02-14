import React, { useContext } from "react";
import "./Login.css";
import "./LoginForm.css";
import { LinkContainer } from "react-router-bootstrap";
// import { useNavigate } from "react-router-dom";
import { FloatingLabel, Form } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  let { loginUser, user } = useContext(AuthContext);
  console.log(user);
  const loginPanel = (
    <div>
      <div className="login-card">
        <div id="text-1">
          <span>Welcome</span>
          <span>to the Rhyming World!</span>
        </div>
        <div id="text-2">
          <div>Hey, Enter your details to get Login</div>
          <div id="text-3">to your account</div>
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
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              className="login-input"
            />
          </FloatingLabel>
          <button className="login-button" type="submit">
            Sign in
          </button>
        </Form>
        {/* Login Form */}
        <LinkContainer to="/reset-password/">
          <div id="text-4">Having trouble in sign in?</div>
        </LinkContainer>

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
      {user && path("/home")}
    </>
  );
};

export default LoginPage;

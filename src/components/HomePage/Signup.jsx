import React, { useState } from "react";
import "./Signup.css";
import { Form, FloatingLabel } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [username, setUsername] = useState(" ");
  const navigate = useNavigate();

  let Signup = async (e) => {
    e.preventDefault();
    // console.log(username, email, password);
    let item = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    console.log(item);
    let response = await fetch("http://127.0.0.1:8000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    let result = await response.json();
    console.log(result);
    localStorage.setItem("user-info", JSON.stringify(result));
    if (response.ok) {
      navigate("/");
      alert("now you have to login with your credentials");
    } else {
      alert("Already have an account");
    }
  };
  return (
    <>
      <div className="home-img">
        <div className="signup-card">
          <div id="s-text-1">Hey, Enter your details for sign up</div>
          <Form onSubmit={Signup}>
            <div className="signup-details">
              {/* First Name */}
              <FloatingLabel
                label="First Name"
                className="signup-label"
                autoCapitalize="sentences"
                onChange={(e) => setUsername(e.target.value)}
              >
                <Form.Control
                  required
                  type="text"
                  placeholder="first name"
                  name="username"
                  className="signup-input margin--right signup-width"
                />
              </FloatingLabel>
              {/* Last Name */}
              <FloatingLabel label="Last Name" className="signup-label">
                <Form.Control
                  required
                  type="text"
                  placeholder="last name"
                  className="signup-input signup-width"
                />
              </FloatingLabel>
            </div>
            {/* Email ID */}
            <FloatingLabel
              label="Email Address"
              className="signup-label"
              onChange={(e) => setEmail(e.target.value)}
            >
              <Form.Control
                required
                type="email"
                name="email"
                placeholder="abc@gmail.com"
                className="signup-input"
              />
            </FloatingLabel>
            {/* Phone Number */}
            {/* <FloatingLabel label="Phone Number" className="signup-label">
              <Form.Control
                required
                type="text"
                placeholder="+91xxxxxx"
                className="signup-input"
              />
            </FloatingLabel>  */}
            <div className="signup-details">
              {/*Create Password */}
              <FloatingLabel
                label="Create Password"
                className="signup-label"
                onChange={(e) => setPassword(e.target.value)}
              >
                <Form.Control
                  required
                  type="password"
                  name="password"
                  className="signup-input signup-width margin--right"
                  placeholder="create password"
                />
              </FloatingLabel>
              {/* Confirm Password */}
              {/* <FloatingLabel label="Confirm Password" className="signup-label">
                <Form.Control
                  required
                  type="password"
                  className="signup-input signup-width"
                  placeholder="confirm password"
                />
              </FloatingLabel> */}
            </div>
            <Form.Text
              id="passwordHelpBlock"
              muted
              as="div"
              className="s-password-text"
            >
              Use 8 or more characters with a mix of letters, numbers & symbols
            </Form.Text>
            <div className="s-statement">
              By clicking 'Continue', you agree to the <strong>Terms </strong>
              and <br /> &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
              acknowledge the <strong>Privacy Policy</strong>
            </div>
            <button className="signup-button" type="submit">
              Continue
            </button>
            <div id="s-text-5">
              <span>Already have an account?&nbsp;</span>
              <span>
                <LinkContainer to="/">
                  <strong>Log in</strong>
                </LinkContainer>
              </span>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SignupPage;

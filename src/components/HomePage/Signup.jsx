import React, { useState } from "react";
import "./Signup.css";
import { Form, FloatingLabel } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Icon from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

const SignupPage = () => {
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [username, setUsername] = useState(" ");
  const navigate = useNavigate();
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

  let Signup = async (e) => {
    e.preventDefault();
    console.log(username, email, password);
    let item = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    console.log(item);
    let response = await fetch("https://api.rhymes.world/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    let result = await response.json();
    console.log(result);
    localStorage.setItem("user-info", JSON.stringify(result));

    // axios
    //   .post("https://api.rhymes.world/api/auth/register", {
    //     username: e.target.username.value,
    //     email: e.target.email.value,
    //     password: e.target.password.value,
    //   })
    //   .then((response) => {
    //     console.log(response);
    //     if (response.status === 200) {
    //       // navigate("/");
    //       alert("now you have to login with your credentials");
    //     } else if (response.status === 500) {
    //       alert("Email already used!");
    //     } else if (response.status === 400) {
    //       alert("Username already used!");
    //     } else {
    //       alert("Something went wrong!");
    //     }
    //   })
    //   .catch((err) => console.log(err));

    console.log(response.status);
    if (response.status === 200) {
      navigate("/");
      alert("now you have to login with your credentials");
    } else if (response.status === 500) {
      alert("Email already used!");
    } else if (response.status === 400) {
      alert("Username already used!");
    } else {
      alert("Something went wrong!");
    }
  };
  return (
    <>
      <div>
        <div className="signup-card">
          <div id="s-text-1">Enter your details for sign up</div>
          <Form className="signup-form" onSubmit={Signup}>
            {/* First Name */}
            <FloatingLabel
              label="Username"
              className="signup-label"
              autoCapitalize="sentences"
              onChange={(e) => setUsername(e.target.value)}
            >
              <Form.Control
                required
                type="text"
                placeholder="first name"
                name="username"
                className="signup-input"
              />
            </FloatingLabel>

            {/* Email ID */}
            <FloatingLabel
              label="Email Address"
              className="signup-label"
              autoCapitalize="sentences"
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

            {/*Create Password */}
            <FloatingLabel
              label="Create Password"
              className="signup-label"
              onChange={(e) => setPassword(e.target.value)}
            >
              <Icon
                onClick={handlePassToggle}
                icon={icon}
                size={22}
                className="password-icon"
              />
              <Form.Control
                required
                type={type}
                name="password"
                className="signup-input"
                placeholder="create password"
              />
            </FloatingLabel>
            <Form.Text
              id="passwordHelpBlock"
              muted
              as="div"
              className="s-password-text"
            >
              Use 8 or more characters with a mix of letters, numbers & symbols
            </Form.Text>
            <button className="signup-button" type="submit">
              Continue
            </button>
            <div className="s-statement">
              By clicking 'Continue', you agree to the <strong>Terms </strong>
              and <br /> &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
              acknowledge the <strong>Privacy Policy</strong>
            </div>
            <div id="s-text-5">
              <span>Already have an account?&nbsp;</span>
              <span>
                <LinkContainer to="/login">
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

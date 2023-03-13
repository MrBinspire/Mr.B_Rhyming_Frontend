import React, { useState, useContext, useEffect } from "react";
import "./Signup.css";
import { Form, FloatingLabel } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Icon from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import AuthContext from "../../context/AuthContext";

const SignupPage = () => {
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [username, setUsername] = useState(" ");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const { loginTheUser } = useContext(AuthContext);

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
    if (email.trim() === "") {
      setEmailError("Please enter your email");
      return;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    let item = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    let response = await fetch("https://api.rhymes.world/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    let result = await response.json();
    localStorage.setItem("user-info", JSON.stringify(result));
    if (response.status === 200) {
      let loginItem = {
        username: username,
        password: password,
      };
      loginTheUser(loginItem);
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
          <div id="s-text-1">Signup to add Rhymes</div>
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
                required={true}
                type="email"
                name="email"
                placeholder="abc@gmail.com"
                className="signup-input"
              />
            </FloatingLabel>
            {emailError && <div className="error">{emailError}</div>}

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

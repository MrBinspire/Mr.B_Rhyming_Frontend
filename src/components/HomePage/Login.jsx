import React, { useContext } from "react";
import "./Login.css";
import "./LoginForm.css";
import { LinkContainer } from "react-router-bootstrap";
// import { useNavigate } from "react-router-dom";
import { FloatingLabel, Form } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";

const LoginPage = () => {
  // const[password,setPassword] =useState("")
  // const[username,setUsername] =useState("")
  // const navigate=useNavigate();
  // async function LoginPage(e)
  // {
  //  e.preventDefault();
  //   console.log(username,password);
  //   let item={username:username,password:password};
  //   // console.log(item)
  //   let response=await fetch("http://127.0.0.1:8000/api/auth/login",{
  //    method:"POST",
  //    headers:{
  //     "Content-Type":"application/json"
  //   },
  //    body:JSON.stringify(item)
  //   });
  //   let result=await response.json()
  //   localStorage.setItem("user-info",JSON.stringify(result))
  //   console.log(result);
  //  if(response.ok){
  //   // console.log(response)
  //   if(username==='Admin'){
  //     alert("logged in as Admin!")
  //     navigate("/Admin")
  //  }
  //  else{
  //   alert(`${username} has logged in!`)
  //   navigate("/home")
  //  }
  // }
  //  else{
  //    alert("your credentials are wrong")
  //  }
  // }

  let { loginUser } = useContext(AuthContext);

  return (
    <>
      <div className="home-img">
        <div className="login-card">
          <div id="text-1">Welcome to the Rhyming World!</div>
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
    </>
  );
};

export default LoginPage;

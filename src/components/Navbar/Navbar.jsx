import React, { useContext } from "react";
import "./Navbar.css";
import AuthContext from "../../context/AuthContext";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Logo from "../../images/Mr.B.png";
import Offcanvas from "react-bootstrap/Offcanvas";

const NavBar = () => {
  let { user, logoutUser } = useContext(AuthContext);

  return (
    <header>
      {user ? (
        <>
          {user.username === "Admin" ? (
            <>
              {" "}
              {["xl"].map((expand) => (
                <Navbar key={expand} expand={expand} className="mb-0">
                  <Container fluid>
                    <Navbar.Brand href="/home">
                      <img
                        alt=""
                        src={Logo}
                        width="50"
                        height="45"
                        className="d-inline-block align-top nav-img"
                      />{" "}
                      <span id="nav-title">Hello {user.username}</span>
                    </Navbar.Brand>
                    <Navbar.Toggle
                      aria-controls={`offcanvasNavbar-expand-${expand}`}
                    />
                    <Navbar.Offcanvas
                      style={{ width: "50%" }}
                      id={`offcanvasNavbar-expand-${expand}`}
                      aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                      placement="end"
                    >
                      <Offcanvas.Header closeButton>
                        <Offcanvas.Title
                          id={`offcanvasNavbarLabel-expand-${expand}`}
                        >
                          Mr.B's Rhyming Dictionary
                        </Offcanvas.Title>
                      </Offcanvas.Header>
                      <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                          <Nav.Link href="/home" id="Home">
                            Home
                          </Nav.Link>
                          <Nav.Link href="/Search" id="search">
                            Rhymes Input
                          </Nav.Link>
                          <Nav.Link href="/Admin" id="admin">
                            Admin
                          </Nav.Link>
                          <Nav.Link
                            href="/Accept-or-reject"
                            id="accept-or-reject"
                          >
                            Accept or Reject
                          </Nav.Link>
                          <Nav.Link href="/Blog" id="admin">
                            Blog
                          </Nav.Link>
                          <Nav.Link href="/Community" id="admin">
                            Community
                          </Nav.Link>
                          <Nav.Link onClick={logoutUser} id="logout">
                            Logout
                          </Nav.Link>
                        </Nav>
                      </Offcanvas.Body>
                    </Navbar.Offcanvas>
                  </Container>
                </Navbar>
              ))}
            </>
          ) : (
            <>
              {["xl"].map((expand) => (
                <Navbar key={expand} expand={expand} className="mb-0">
                  <Container fluid>
                    <Navbar.Brand href="/home">
                      <img
                        alt=""
                        src={Logo}
                        width="50"
                        height="45"
                        className="d-inline-block align-top nav-img"
                      />{" "}
                      <span id="nav-title">Hello {user.username}</span>
                    </Navbar.Brand>
                    <Navbar.Toggle
                      aria-controls={`offcanvasNavbar-expand-${expand}`}
                    />
                    <Navbar.Offcanvas
                      style={{ width: "50%" }}
                      id={`offcanvasNavbar-expand-${expand}`}
                      aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                      placement="end"
                    >
                      <Offcanvas.Header closeButton>
                        <Offcanvas.Title
                          id={`offcanvasNavbarLabel-expand-${expand}`}
                        >
                          Mr.B's Rhyming Dictionary
                        </Offcanvas.Title>
                      </Offcanvas.Header>
                      <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                          <Nav.Link href="/home" id="Home">
                            Home
                          </Nav.Link>
                          <Nav.Link href="/Search" id="search">
                            Search
                          </Nav.Link>
                          <Nav.Link href="/Blog" id="admin">
                            Blog
                          </Nav.Link>
                          <Nav.Link href="/Community" id="admin">
                            Community
                          </Nav.Link>
                          <Nav.Link onClick={logoutUser} id="logout">
                            Logout
                          </Nav.Link>
                        </Nav>
                      </Offcanvas.Body>
                    </Navbar.Offcanvas>
                  </Container>
                </Navbar>
              ))}
            </>
          )}
        </>
      ) : (
        <Navbar className="mb-0 nav-before-login">
          <Container fluid>
            <Navbar.Brand>
              {/* <img
                    alt=""
                    src={Logo}
                    width="50"
                    height="45"
                    className="d-inline-block align-top nav-img"
                  />{" "} */}
              <span className="nav-title-bl">Mr.B's Rhyming Dictionary</span>
            </Navbar.Brand>
          </Container>
        </Navbar>
      )}
    </header>
  );
};

export default NavBar;

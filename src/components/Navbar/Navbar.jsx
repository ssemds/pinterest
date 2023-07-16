import { Button, Form, Image } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../img/logoPRINT.jpg";
import profile from "../img/profile.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContextProvider";
import { useEffect } from "react";

function BasicExample() {
  const navigate = useNavigate();
  const { currentUser, logout, checkAuth } = useAuth();

  useEffect(() => {
    if (localStorage.getItem("tokens")) {
      checkAuth();
    }
  }, []);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Image src={logo} alt="" width="auto" height={25} />
        {/* <Navbar.Brand href="#home">Pinterest</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Главная</Nav.Link>

            <NavDropdown title="Создать" id="basic-nav-dropdown">
              {/* <NavDropdown.Item href=" ">
                Создать пин-идею
              </NavDropdown.Item> */}

              <NavDropdown.Item href="/add">Создать пин</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>
          <Form className="d-flex w-100 ">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              style={{ borderRadius: "20px" }}
            />
            <Button variant="outline-success">Search</Button>
          </Form>

          <NavDropdown
            title={<img src={profile} alt="" width="auto" height={35} />}
            id="basic-nav-dropdown"
            align="end"
            style={{ marginLeft: "10px" }}
          >
            <NavDropdown.Item onClick={() => navigate("/login")}>
              Login
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => navigate("/register")}>
              Register
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
        <Nav.Link href="#" disabled>
          {currentUser ? currentUser : "No auth user"}
        </Nav.Link>
      </Container>
    </Navbar>
  );
}

export default BasicExample;

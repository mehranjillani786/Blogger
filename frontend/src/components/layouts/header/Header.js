import React from 'react'
import { Link, Outlet } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap"
import { category } from "../../../helper/constants"
import { Login } from "../../index"
import Register from '../../register/Register';
import { logout } from '../../../store/features/user/UserSlice';
import { useSelector, useDispatch } from 'react-redux';

function Header() {
  const [showLoginModal, setShowLoginModalShow] = React.useState(false);
  const [showRegisterModal, setShowRegisterModalShow] = React.useState(false);
  const { isAuthenticated } = useSelector(state => state.user)
  const dispatch = useDispatch();

  const handleRegisterModalClose = () => setShowRegisterModalShow(false);
  const handleRegisterModalShow = () => setShowRegisterModalShow(true);

  const handleLoginModalClose = () => setShowLoginModalShow(false);
  const handleLoginModalShow = () => setShowLoginModalShow(true);
  const logoutBtn = () => {
    dispatch(logout())
  }
  return (
    <>

      <Navbar collapseOnSelect expand="lg" className="blogheader" fixed="top">
        <Container>
          <Navbar.Brand href="/#home" className="fs-4 text-uppercase fw-bold"><span className="text-bold text-info ">B</span>logger</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/#home">Home</Nav.Link>
              <Nav.Link href="/#feature-post">Feature Blogs</Nav.Link>
              {category.map((c, i) => <Nav.Link key={i} href={c.path}>{c.name}</Nav.Link>)}
              <Nav.Link href="/#contact-us">Contact us</Nav.Link>

            </Nav>
            {!isAuthenticated ?
              <Nav>
                <Nav.Link href="#login" onClick={handleLoginModalShow}>Login</Nav.Link>
                <Nav.Link href="#register" onClick={handleRegisterModalShow}>Register</Nav.Link>
              </Nav> : null}
            {isAuthenticated ? <Nav.Link href="#home" onClick={logoutBtn}>Log Out</Nav.Link> : null}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Login */}
      <Login show={showLoginModal} handleClose={handleLoginModalClose} />
      <Register show={showRegisterModal} handleClose={handleRegisterModalClose} />
    </>

  )
}

export default Header
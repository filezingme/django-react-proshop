import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'


function Header() {

  //lấy dữ liệu userLogin từ store
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }

  // const navMeicon = (<><i className="fa fa-share-alt" aria-hidden="true"></i> Me & Share</>);

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand><i className="fas fa-shopping-cart"></i> IHAYWA</Navbar.Brand>
          </LinkContainer>
            
          <SearchBox />

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">


            <Nav>
              <Nav.Item className="ms-4 me-0">
                <LinkContainer to='/cart'>
                  <Nav.Link><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
                </LinkContainer>
              </Nav.Item>

              {/* <NavDropdown title={navMeicon}></NavDropdown> */}
              <NavDropdown title={<><i className="fa fa-share-alt" aria-hidden="true"></i> Me / Share</>} id='adminmenu' className="ms-4 me-0">
                <a href="/overview" className="dropdown-item">Overview</a>
                <a href="/features-video" className="dropdown-item">Features of Website (video)</a>                  
                <a href="https://github.com/filezingme/django-react-proshop" className="dropdown-item" target='_blank'>Source Code (github)</a>
                <a href="/development-process" className="dropdown-item">Development Process (doc)</a>
                <a href="/aboutme" className="dropdown-item">About Me</a>
              </NavDropdown>

              {userInfo ? (
                <NavDropdown title={<><i className="fa fa-user" aria-hidden="true"></i> {userInfo.name}</>} id={'username'} className="ms-4 me-0">
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login' className="ms-4 me-0">
                  <Nav.Link><i className="fas fa-user"></i> Login</Nav.Link>
                </LinkContainer>
              )}  

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title={<><i className="fa fa-user-circle" aria-hidden="true"></i> Admin</>} id='adminmenu' className="ms-4 me-0">
                  <LinkContainer to='/admincp/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  
                  <LinkContainer to='/admincp/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  
                  <LinkContainer to='/admincp/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}            
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;

import React from 'react';
import {
  Nav,
  Navbar,
  NavItem,
} from 'react-bootstrap/lib';
import { LinkContainer } from 'react-router-bootstrap';
import './Menu.css';

const Menu = () =>
  (<div>
    <Navbar>
      <Navbar.Header>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav className="navbar-center">
          <LinkContainer exact to="/">
            <NavItem>My Taxi</NavItem>
          </LinkContainer>
          <LinkContainer to="/car2go">
            <NavItem>Car to go</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </div>);

export default Menu;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export class NavMenu extends Component {
    displayName = NavMenu.name

    render() {
        return (
            <Navbar inverse fixedTop collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to={'/'}>CPM</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer to={'/'} exact>
                            <NavItem>
                                <Glyphicon glyph='home' /> Home
                            </NavItem>
                        </LinkContainer>
                        <LinkContainer to={'/cars'}>
                            <NavItem>
                                <Glyphicon glyph='plane' /> Cars
                            </NavItem>
                        </LinkContainer>
                        <LinkContainer to={'/employees'}>
                            <NavItem>
                                <Glyphicon glyph='user' /> Employees
                            </NavItem>
                        </LinkContainer>
                        <LinkContainer to={'/caremployees'}>
                            <NavItem>
                                <Glyphicon glyph='plane' /><Glyphicon glyph='user' /> Car Employees
                            </NavItem>
                        </LinkContainer>
                        <LinkContainer to={'/travelplans'}>
                            <NavItem>
                                <Glyphicon glyph='calendar' /> Travel Plans
                            </NavItem>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
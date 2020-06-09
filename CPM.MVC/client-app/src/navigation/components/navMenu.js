import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCar, faUser, faCalendar } from '@fortawesome/free-solid-svg-icons'

export function NavMenu() {
    return (
        <Navbar collapseOnSelect>
            <Navbar.Brand>
                <LinkContainer to='/'>
                    <NavItem>CPM</NavItem>
                </LinkContainer>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Nav justify="true">
                    <LinkContainer to='/' exact>
                        <NavItem>
                            <FontAwesomeIcon icon={faHome} /> Home
                        </NavItem>
                    </LinkContainer>
                    <LinkContainer to='/cars'>
                        <NavItem>
                            <FontAwesomeIcon icon={faCar} /> Cars
                        </NavItem>
                    </LinkContainer>
                    <LinkContainer to='/employees'>
                        <NavItem>
                            <FontAwesomeIcon icon={faUser} /> Employees
                        </NavItem>
                    </LinkContainer>
                    <LinkContainer to='/caremployees'>
                        <NavItem>
                            <FontAwesomeIcon icon={faCar} /> <FontAwesomeIcon icon={faUser} /> Car Employees
                        </NavItem>
                    </LinkContainer>
                    <LinkContainer to='/travelplans'>
                        <NavItem>
                            <FontAwesomeIcon icon={faCalendar} /> Travel Plans
                        </NavItem>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
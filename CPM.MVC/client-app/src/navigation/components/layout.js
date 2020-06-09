import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { NavMenu } from '../../navigation';

export function Layout(props) {
    return (
        <Container>
            <Row>
                <Col>
                    <NavMenu />
                    {props.children.map((item) => item)}
                </Col>
            </Row>
        </Container>
    );
}
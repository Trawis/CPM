import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { Textbox } from '../../shared';
import { API } from '../../core';

export const AddModal = ({ isShowing, hide, getAll }) => {
    const [carState, setCarState] = useState({});
    const [errors, setErrors] = useState([]);

    const handleChange = (e) => {
        let target = e.target;
        setCarState({ ...carState, [target.name]: target.value });
    };

    const addCar = async () => {
        try {
            await API.car.create(carState).then(getAll).then(hide);
        } catch (e) {
            if (e.errors) {
                setErrors(e.errors.map(error => error.message));
            } else {
                setErrors([e.title]);
            }
        }
    };

    return (
        <Modal size="lg" show={isShowing} onHide={hide} backdrop="static" centered>
            <Modal.Header className="modal-header" closeButton>
                <Modal.Title>
                    Add new car
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body">
                {errors && errors.length > 0 &&
                    <Alert variant="danger">
                        <ul>
                            {errors.map((error, i) =>
                                <li key={i}>{error}</li>
                            )}
                        </ul>
                    </Alert>
                }
                <Form>
                    <Row>
                        <Col md={6}>
                            <Textbox
                                id="nameId"
                                name="name"
                                label="Name"
                                value={carState.name}
                                onChange={handleChange}
                            />
                        </Col>
                        <Col md={6}>
                            <Textbox
                                id="typeId"
                                name="type"
                                label="Type"
                                value={carState.type}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Textbox
                                id="colorId"
                                name="color"
                                label="Color"
                                value={carState.color}
                                onChange={handleChange}
                            />
                        </Col>
                        <Col md={4}>
                            <Textbox
                                id="platesId"
                                name="plates"
                                label="Plates"
                                value={carState.plates}
                                onChange={handleChange}
                            />
                        </Col>
                        <Col md={4}>
                            <Textbox
                                id="seatsNumberId"
                                name="seatsNumber"
                                type="number"
                                label="Seats Number"
                                value={carState.seatsNumber}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer className="modal-footer d-inline">
                <Button variant="primary" className="pull-left" onClick={addCar}><FontAwesomeIcon icon={faSave} /> Save</Button>
                <Button variant="default" className="pull-right" onClick={hide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}
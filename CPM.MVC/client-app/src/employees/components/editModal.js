import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { Textbox, Checkbox } from '../../shared';
import { API } from '../../core';

export const EditModal = ({ isShowing, hide, employee, getAll }) => {
    const [employeeState, setEmployeeState] = useState(employee);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (!employee) {
            return;
        }
        setEmployeeState(employee);
    }, [employee]);

    const handleChange = (e) => {
        let target = e.target;
        setEmployeeState({ ...employeeState, [target.name]: target.type !== 'checkbox' ? target.value : target.checked });
    };

    const updateEmployee = async () => {
        try {
            await API.employee.update(employeeState).then(getAll).then(hide);
        }
        catch (e) {
            if (e.errors) {
                setErrors(e.errors.map(error => error.message));
            } else {
                setErrors([e.title]);
            }
        }
    };

    return (
        isShowing &&
        <Modal size="lg" show={isShowing} onHide={hide} backdrop="static" centered>
            <Modal.Header className="modal-header" closeButton>
                <Modal.Title>
                    Edit employee
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
                                value={employeeState.name}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Checkbox
                                id="isDriverId"
                                name="isDriver"
                                label="Is Driver"
                                checked={employeeState.isDriver}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer className="modal-footer d-inline">
                <Button variant="primary" className="pull-left" onClick={updateEmployee}><FontAwesomeIcon icon={faSave} /> Save</Button>
                <Button variant="default" className="pull-right" onClick={hide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
};
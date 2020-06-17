import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { DatetimePickerTrigger } from 'imrc-datetime-picker';
import moment from 'moment-jalaali';
import { Textbox, Selectbox, mapFromSelectbox } from '../../shared';
import { API } from '../../core';
import "imrc-datetime-picker/dist/imrc-datetime-picker.css";

export const AddModal = ({ isShowing, hide, getAll, carOptions, employeeOptions }) => {
    const [travelPlanState, setTravelPlanState] = useState({ moment: moment() });
    const [errors, setErrors] = useState([]);

    const handleChange = (e, name) => {
        let target = e.target;
        let targetName = name ? name : target.name;
        switch (targetName) {
            case 'startDate':
            case 'endDate':
                setTravelPlanState({ ...travelPlanState, [targetName]: e.format("MM/DD/YYYY HH:mm"), moment: e });
                break;
            default:
                setTravelPlanState({ ...travelPlanState, [target.name]: target.value });
                break;
        }
    };

    const addTravelPlan = async () => {
        try {
            let travelPlan = {
                ...travelPlanState,
                car: mapFromSelectbox(travelPlanState.car, "name", "carId"),
                employees: mapFromSelectbox(travelPlanState.employees, "name", "employeeId")
            }

            await API.travelPlan.create(travelPlan).then(getAll).then(hide);
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
                    Add new travel plan
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
                                id="startLocationId"
                                name="startLocation"
                                label="Start Location"
                                value={travelPlanState.startLocation}
                                onChange={handleChange}
                            />
                        </Col>
                        <Col md={6}>
                            <Textbox
                                id="endLocationId"
                                name="endLocation"
                                label="End Location"
                                value={travelPlanState.endLocation}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <DatetimePickerTrigger
                                moment={travelPlanState.moment}
                                onChange={(_moment) => handleChange(_moment, "startDate")}
                                showTimePicker={true}>
                                <Textbox
                                    id="startDateId"
                                    name="startDate"
                                    label="Start Date"
                                    value={travelPlanState.startDate}
                                    readOnly={true}
                                />
                            </DatetimePickerTrigger>
                        </Col>
                        <Col md={6}>
                            <DatetimePickerTrigger
                                moment={travelPlanState.moment}
                                onChange={(_moment) => handleChange(_moment, "endDate")}
                                showTimePicker={true}>
                                <Textbox
                                    id="endDateId"
                                    name="endDate"
                                    label="End Date"
                                    value={travelPlanState.endDate}
                                    readOnly={true}
                                />
                            </DatetimePickerTrigger>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Selectbox
                                id="carSelectId"
                                name="car"
                                label="Select a car"
                                optionValue="carId"
                                optionLabel="name"
                                value={travelPlanState.car}
                                options={carOptions}
                                isMultiselect={false}
                                onChange={handleChange}
                            />
                        </Col>
                        <Col md={6}>
                            <Selectbox
                                id="employeesSelectId"
                                name="employees"
                                label="Select employees"
                                optionValue="employeeId"
                                optionLabel="name"
                                value={travelPlanState.employees}
                                options={employeeOptions}
                                isMultiselect={true}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer className="modal-footer d-inline">
                <Button variant="primary" className="pull-left" onClick={addTravelPlan}><FontAwesomeIcon icon={faSave} /> Save</Button>
                <Button variant="default" className="pull-right" onClick={hide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}
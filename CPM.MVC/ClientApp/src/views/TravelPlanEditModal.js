import React, { Component } from 'react';
import { Form, Modal, Button, Glyphicon, Row, Col, Alert } from 'react-bootstrap';
import moment from 'moment-jalaali';
import { DatetimePickerTrigger } from 'imrc-datetime-picker';
import "imrc-datetime-picker/dist/imrc-datetime-picker.css";
import Api from '../services/Api';
import { Textbox, Selectbox } from '../components';
import { mapFromSelectbox, mapToSelectbox } from '../utils';

export class TravelPlanEditModal extends Component {
    state = {
        startLocation: '',
        endLocation: '',
        startDate: '',
        endDate: '',
        car: '',
        employees: [],
        carOptions: [],
        employeeOptions: [],
        moment: moment(),
        errors: undefined
    };

    componentWillReceiveProps(nextprops) {
        if (nextprops.travelPlanId !== undefined) {
            this.setState({
                ...nextprops,
                startDate: moment(nextprops.startDate).format('MM/DD/YYYY HH:mm'),
                endDate: moment(nextprops.endDate).format('MM/DD/YYYY HH:mm'),
                car: mapToSelectbox(nextprops.car, "name", "carId"),
                employees: mapToSelectbox(nextprops.employees, "name", "employeeId"),
                errors: undefined
            });
        }
    };

    handleChange = (e, name) => {
        let target = e.target;
        let targetName = name ? name : target.name;

        this.setState(prevState => {
            switch (targetName) {
                case 'startDate':
                case 'endDate':
                    prevState[targetName] = e.format("MM/DD/YYYY HH:mm");
                    prevState.moment = e;
                    break;
                default:
                    prevState[target.name] = target.value;
                    break;
            }
            return prevState;
        });
    };

    editTravelPlan = async () => {
        try {
            let travelPlan = {
                ...this.state,
                car: mapFromSelectbox(this.state.car, "name", "carId"),
                employees: mapFromSelectbox(this.state.employees, "name", "employeeId")
            }
            await Api.travelPlan.updateTravelPlan(travelPlan);
            await this.props.getTravelPlans();
            await this.props.onHide();
        } catch (e) {
            this.setState({ errors: e.errors.map(error => error.message) });
        }
    };

    render() {
        const { errors, startLocation, endLocation, startDate, endDate,
            car, employees, moment } = this.state;
        const { onHide, show, carOptions, employeeOptions } = this.props;

        return (
            <Modal bsSize="large" show={show} onHide={onHide} backdrop="static">
                <Modal.Header className="modal-header" closeButton>
                    <Modal.Title>
                        Edit travel plan
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body">
                    {errors && errors.length > 0 &&
                        <Alert bsStyle="danger">
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
                                    value={startLocation}
                                    onChange={(e) => this.handleChange(e, "startLocation")}
                                />
                            </Col>
                            <Col md={6}>
                                <Textbox
                                    id="endLocationId"
                                    name="endLocation"
                                    label="End Location"
                                    value={endLocation}
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <DatetimePickerTrigger
                                    moment={moment}
                                    onChange={(_moment) => this.handleChange(_moment, "startDate")}
                                    showTimePicker={true}>
                                    <Textbox
                                        id="startDateId"
                                        name="startDate"
                                        label="Start Date"
                                        value={startDate}
                                        readOnly={true}
                                    />
                                </DatetimePickerTrigger>
                            </Col>
                            <Col md={6}>
                                <DatetimePickerTrigger
                                    moment={moment}
                                    onChange={(_moment) => this.handleChange(_moment, "endDate")}
                                    showTimePicker={true}>
                                    <Textbox
                                        id="endDateId"
                                        name="endDate"
                                        label="End Date"
                                        value={endDate}
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
                                    value={car}
                                    options={carOptions}
                                    isMultiselect={false}
                                    onChange={this.handleChange}
                                />
                            </Col>
                            <Col md={6}>
                                <Selectbox
                                    id="employeesSelectId"
                                    name="employees"
                                    label="Select employees"
                                    optionValue="employeeId"
                                    optionLabel="name"
                                    value={employees}
                                    options={employeeOptions}
                                    isMultiselect={true}
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="modal-footer d-inline">
                    <Button bsStyle="primary" className="pull-left" size="large" onClick={() => this.editTravelPlan()}><Glyphicon glyph='floppy-disk' /> Save</Button>
                    <Button bsStyle="default" className="pull-right" size="large" onClick={onHide}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    };
}
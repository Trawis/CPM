import React, { useState, useEffect } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { DatetimePickerTrigger } from 'imrc-datetime-picker';
import moment from 'moment-jalaali';
import { API } from '../../core';
import { Textbox } from '../../shared';
import "imrc-datetime-picker/dist/imrc-datetime-picker.css";

export function CarEmployees() {
    const [state, setState] = useState({ carEmployees: [], moment: moment(), date: moment().format("MMMM") });

    useEffect(() => {
        getAll();
    }, [state.date]);

    const getAll = async () => {
        const result = await API.car.getCarEmployees(state.moment.format("MM/DD/YYYY"));
        setState({ ...state, carEmployees: result });
    };

    const handleChange = (moment) => {
        setState({ ...state, date: moment.format("MMMM"), moment: moment });
    };

    return (
        <Col>
            <h1>Car Employees</h1>
            <p>See which employees are in the vehicle in the selected month</p>
            <Row>
                <Col md={3}>
                    <DatetimePickerTrigger
                        moment={state.moment}
                        onChange={(_moment) => handleChange(_moment)}
                        showTimePicker={false}
                        minPanel="month">
                        <Textbox
                            id="dateId"
                            name="date"
                            label="Choose month"
                            value={state.date}
                            readOnly={true}
                        />
                    </DatetimePickerTrigger>
                </Col>
            </Row>
            <Table striped bordered responsive size="sm">
                <thead>
                    <tr>
                        <th>Car Name</th>
                        <th>Car Type</th>
                        <th>Car Color</th>
                        <th>Car Plates</th>
                        <th>Car Seats Number</th>
                        <th>Employees</th>
                    </tr>
                </thead>
                <tbody>
                    {state.carEmployees && state.carEmployees.map(carEmployee =>
                        <tr key={carEmployee.car.carId}>
                            <td>{carEmployee.car.name}</td>
                            <td>{carEmployee.car.type}</td>
                            <td>{carEmployee.car.color}</td>
                            <td>{carEmployee.car.plates}</td>
                            <td>{carEmployee.car.seatsNumber}</td>
                            <td>
                                <Table striped bordered responsive size="sm">
                                    <tbody>
                                        {carEmployee.employees.map(employee =>
                                            <tr key={employee.employeeId}>
                                                <td>{employee.name}{employee.isDriver && <i>{" (Driver)"}</i>}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Col>
    );
};
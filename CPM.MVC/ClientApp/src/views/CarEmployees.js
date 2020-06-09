import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Api from '../services/Api';
import Loader from 'react-loader-spinner';
import moment from 'moment-jalaali';
import { DatetimePickerTrigger } from 'imrc-datetime-picker';
import "imrc-datetime-picker/dist/imrc-datetime-picker.css";
import { Textbox } from '../components';

export class CarEmployees extends Component {
    constructor(props) {
		super(props);

        this.state = {
            carEmployees: [],
            loading: true,
            moment: moment(),
            date: moment().format("MMMM")
        };
    };

    componentDidMount() {
        this.getCarEmployees();
    };

    getCarEmployees = async () => {
        let carEmployees = await Api.car.getCarEmployees(this.state.moment.format("MM/DD/YYYY"));
        this.setState({ carEmployees, loading: false });
    };

    handleChange = (moment) => {
        this.setState({
            date: moment.format("MMMM"),
            moment: moment,
            loading: true
        }, () => this.getCarEmployees());
    };

    renderCarEmployeesData(carEmployees) {
        const { moment, date } = this.state;

        return (
            <div>
                <Row>
                    <Col md={3}>
                        <DatetimePickerTrigger
                            moment={moment}
                            onChange={(_moment) => this.handleChange(_moment)}
                            showTimePicker={false}
                            minPanel="month">
                            <Textbox
                                id="dateId"
                                name="date"
                                label="Choose month"
                                value={date}
                                readOnly={true}
                            />
                        </DatetimePickerTrigger>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <table className='table table-striped'>
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
                                {carEmployees.map(carEmployee =>
                                    <tr key={carEmployee.car.carId}>
                                        <td>{carEmployee.car.name}</td>
                                        <td>{carEmployee.car.type}</td>
                                        <td>{carEmployee.car.color}</td>
                                        <td>{carEmployee.car.plates}</td>
                                        <td>{carEmployee.car.seatsNumber}</td>
                                        <td>
                                            {carEmployee.employees.map(employee =>
                                                <tr key={employee.employeeId}>
                                                    <td>{employee.name}{employee.isDriver && <i>{" (Driver)"}</i>}</td>
                                                </tr>
                                            )}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </div>
        );
    }

    render() {
        const { loading, carEmployees } = this.state;
        const contents = loading
            ? <Loader type="ThreeDots" color="#00000" height={100} width={100} />
            : this.renderCarEmployeesData(carEmployees);

        return (
            <div>
                <h1>Car Employees</h1>
                <p>See which employees are in the vehicle in the selected month</p>
                {contents}
            </div>
        );
    }
}

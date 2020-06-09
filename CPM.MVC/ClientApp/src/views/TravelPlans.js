import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap'
import Api from '../services/Api'
import moment from 'moment-jalaali'
import { TravelPlanAddModal, TravelPlanEditModal, ConfirmationModal } from './'
import Loader from 'react-loader-spinner'

export class TravelPlans extends Component {
    constructor(props) {
		super(props);

        this.state = {
            travelPlanId: undefined,
            travelPlan: undefined,
            travelPlans: [],
            carOptions: [],
            employeeOptions: [],
            loading: true,
            modals: {
                addModalShow: false,
                editModalShow: false,
                deleteModalShow: false
            }
        };
    };

    componentDidMount() {
        this.getTravelPlans();
        this.getSelectData();
    };

    handleModalShow = (modalName, travelPlanId) => {
        this.setState(prevState => {
            switch (modalName) {
                case 'editModalShow':
                    prevState.travelPlan = prevState.travelPlans.find(tp => tp.travelPlanId === travelPlanId)
                    break;
                default:
                    break;
            }
            prevState.modals[modalName] = !prevState.modals[modalName];
            prevState.travelPlanId = travelPlanId;
            return prevState;
        });
    };

    getSelectData = async () => {
        let carOptions = await Api.car.getAllCars();
        let employeeOptions = await Api.employee.getAllEmployees();
        this.setState({ carOptions, employeeOptions });
    };

    getTravelPlans = async () => {
        let travelPlans = await Api.travelPlan.getAllTravelPlans();
        this.setState({ travelPlans, loading: false });
    };

    deleteTravelPlan = async travelPlanId => {
        await Api.travelPlan.deleteTravelPlan(travelPlanId).then(() => this.getTravelPlans());
    };

    renderTravelPlansData(travelPlans) {
        return (
            <div>
                <Button bsStyle="primary" size="large" onClick={() => this.handleModalShow("addModalShow")}><Glyphicon glyph='plus' /> Add new travel plan</Button>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Start Location</th>
                            <th>End Location</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Car Name (Color) - Plates (Seats)</th>
                            <th>Employees</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {travelPlans.map(travelPlan =>
                            <tr key={travelPlan.travelPlanId}>
                                <td>{travelPlan.startLocation}</td>
                                <td>{travelPlan.endLocation}</td>
                                <td>{moment(travelPlan.startDate).format('MM/DD/YYYY HH:mm')}</td>
                                <td>{moment(travelPlan.endDate).format('MM/DD/YYYY HH:mm')}</td>
                                <td>{`${travelPlan.car.name} ${travelPlan.car.type} (${travelPlan.car.color}) - ${travelPlan.car.plates} (${travelPlan.car.seatsNumber})`}</td>
                                <td>
                                    {travelPlan.employees.map(employee =>
                                        <tr key={employee.employeeId}>
                                            <td>{employee.name}{employee.isDriver && <i>{" (Driver)"}</i>}</td>
                                        </tr>
                                    )}</td>
                                <td><Button bsStyle="info" onClick={() => this.handleModalShow("editModalShow", travelPlan.travelPlanId)}><Glyphicon glyph='pencil' /> Edit</Button></td>
                                <td><Button bsStyle="danger" onClick={() => this.handleModalShow("deleteModalShow", travelPlan.travelPlanId)}><Glyphicon glyph='remove' /> Delete</Button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <TravelPlanAddModal
                    show={this.state.modals["addModalShow"]}
                    onHide={() => this.handleModalShow("addModalShow")}
                    getTravelPlans={this.getTravelPlans}
                    employeeOptions={this.state.employeeOptions}
                    carOptions={this.state.carOptions}
                />
                <TravelPlanEditModal
                    show={this.state.modals["editModalShow"]}
                    onHide={() => this.handleModalShow("editModalShow")}
                    getTravelPlans={this.getTravelPlans}
                    employeeOptions={this.state.employeeOptions}
                    carOptions={this.state.carOptions}
                    {...this.state.travelPlan}
                />
                <ConfirmationModal
                    show={this.state.modals["deleteModalShow"]}
                    onHide={() => this.handleModalShow("deleteModalShow")}
                    onConfirm={() => this.deleteTravelPlan(this.state.travelPlanId)}
                />
            </div>
        );
    }

    render() {
        const { loading, travelPlans } = this.state;
        const contents = loading
            ? <Loader type="ThreeDots" color="#00000" height={100} width={100} />
            : this.renderTravelPlansData(travelPlans);

        return (
            <div>
                <h1>Travel Plans</h1>
                <p>Add, edit or remove Travel Plan</p>
                {contents}
            </div>
        );
    }
}

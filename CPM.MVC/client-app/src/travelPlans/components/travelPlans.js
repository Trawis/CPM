import React, { useState, useEffect } from 'react';
import { Col, Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { API } from '../../core';
import { ConfirmationModal, useModal } from '../../shared';
import { AddModal, EditModal } from '../';
import moment from 'moment-jalaali';

export function TravelPlans() {
    const [travelPlans, setTravelPlans] = useState([]);
    const [travelPlan, setTravelPlan] = useState({ car: {}, employees: [] });
    const [carOptions, setCarOptions] = useState({});
    const [employeeOptions, setEmployeeOptions] = useState({});
    const { isShowing: isAddShowing, toggleModal: toggleAddModal } = useModal();
    const { isShowing: isEditShowing, toggleModal: toggleEditModal } = useModal();
    const { isShowing: isConfirmationShowing, toggleModal: toggleConfirmationModal } = useModal();

    useEffect(() => {
        getAll().then(getCarOptions).then(getEmployeeOptions);
    }, []);

    const getAll = async () => {
        const result = await API.travelPlan.getAll();
        setTravelPlans(result);
    };

    const getCarOptions = async () => {
        const result = await API.car.getAll();
        setCarOptions(result);
    };

    const getEmployeeOptions = async () => {
        const result = await API.employee.getAll();
        setEmployeeOptions(result);
    };

    const remove = async () => {
        try {
            await API.travelPlan.delete(travelPlan.travelPlanId).then(getAll).then(toggleConfirmationModal);
        } catch (e) {

        }
    };

    const handleAction = (i, action) => () => {
        setTravelPlan(travelPlans[i]);
        switch (action) {
            case 1:
                toggleEditModal();
                break;
            case 2:
                toggleConfirmationModal();
                break;
            default:
                toggleAddModal();
                break;
        }
    };

    return (
        <Col>
            <h1>Travel Plans</h1>
            <p>Add, edit or remove Travel Plan</p>
            <p><Button variant="primary" onClick={handleAction()}><FontAwesomeIcon icon={faPlus} /> Add new travel plan</Button></p>
            <Table striped bordered responsive size="sm">
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
                    {!travelPlans && "Loading..."}
                    {travelPlans && travelPlans.map((travelPlan, i) =>
                        <tr key={travelPlan.travelPlanId}>
                            <td>{travelPlan.startLocation}</td>
                            <td>{travelPlan.endLocation}</td>
                            <td>{moment(travelPlan.startDate).format('MM/DD/YYYY HH:mm')}</td>
                            <td>{moment(travelPlan.endDate).format('MM/DD/YYYY HH:mm')}</td>
                            <td>{`${travelPlan.car.name} ${travelPlan.car.type} (${travelPlan.car.color}) - ${travelPlan.car.plates} (${travelPlan.car.seatsNumber})`}</td>
                            <td>
                                <Table striped bordered responsive size="sm">
                                    <tbody>
                                        {travelPlan.employees.map(employee =>
                                            <tr key={employee.employeeId}>
                                                <td>{employee.name}{employee.isDriver && <i>{" (Driver)"}</i>}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </td>
                            <td align="center" width="8%"><Button variant="info" size="sm" onClick={handleAction(i, 1)}><FontAwesomeIcon icon={faEdit} /> Edit</Button></td>
                            <td align="center" width="8%"><Button variant="danger" size="sm" onClick={handleAction(i, 2)}><FontAwesomeIcon icon={faTrash} /> Delete</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <AddModal isShowing={isAddShowing} hide={toggleAddModal} getAll={getAll} carOptions={carOptions} employeeOptions={employeeOptions} />
            <EditModal isShowing={isEditShowing} hide={toggleEditModal} travelPlan={travelPlan} getAll={getAll} carOptions={carOptions} employeeOptions={employeeOptions} />
            <ConfirmationModal isShowing={isConfirmationShowing} hide={toggleConfirmationModal} confirm={remove} />
        </Col>
    );
};
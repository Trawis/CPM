import React, { useState, useEffect } from 'react';
import { Col, Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { API } from '../../core';
import { ConfirmationModal, useModal } from '../../shared';
import { AddModal, EditModal } from '../';

export function Employees() {
    const [employees, setEmployees] = useState([]);
    const [employee, setEmployee] = useState({});
    const { isShowing: isAddShowing, toggleModal: toggleAddModal } = useModal();
    const { isShowing: isEditShowing, toggleModal: toggleEditModal } = useModal();
    const { isShowing: isConfirmationShowing, toggleModal: toggleConfirmationModal } = useModal();

    useEffect(() => {
        getAll();
    }, []);

    const getAll = async () => {
        const result = await API.employee.getAll();
        setEmployees(result);
    };

    const remove = async () => {
        try {
            await API.employee.delete(employee.employeeId).then(getAll).then(toggleConfirmationModal);
        } catch (e) {

        }
    };

    const handleAction = (i, action) => () => {
        setEmployee(employees[i]);
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
            <h1>Employees</h1>
            <p>Add, edit or remove Employee</p>
            <p><Button variant="primary" onClick={handleAction()}><FontAwesomeIcon icon={faPlus} /> Add new employee</Button></p>
            <Table striped bordered responsive size="sm">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Is Driver</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {!employees && "Loading..."}
                    {employees && employees.map((employee, i) =>
                        <tr key={employee.employeeId}>
                            <td width="75%">{employee.name}</td>
                            <td>{employee.isDriver ? "Yes" : "No"}</td>
                            <td align="center" width="8%"><Button variant="info" size="sm" onClick={handleAction(i, 1)}><FontAwesomeIcon icon={faEdit} /> Edit</Button></td>
                            <td align="center" width="8%"><Button variant="danger" size="sm" onClick={handleAction(i, 2)}><FontAwesomeIcon icon={faTrash} /> Delete</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <AddModal isShowing={isAddShowing} hide={toggleAddModal} getAll={getAll} />
            <EditModal isShowing={isEditShowing} hide={toggleEditModal} employee={employee} getAll={getAll} />
            <ConfirmationModal isShowing={isConfirmationShowing} hide={toggleConfirmationModal} confirm={remove} />
        </Col>
    );
};
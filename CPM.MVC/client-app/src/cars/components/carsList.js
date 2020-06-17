import React, { useState, useEffect } from 'react';
import { Col, Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { API } from '../../core';
import { ConfirmationModal, useModal } from '../../shared';
import { AddModal, EditModal } from '../';

export function Cars() {
    const [cars, setCars] = useState([]);
    const [car, setCar] = useState({});
    const { isShowing: isAddShowing, toggleModal: toggleAddModal } = useModal();
    const { isShowing: isEditShowing, toggleModal: toggleEditModal } = useModal();
    const { isShowing: isConfirmationShowing, toggleModal: toggleConfirmationModal } = useModal();

    useEffect(() => {
        getAll();
    }, []);

    const getAll = async () => {
        const result = await API.car.getAll();
        setCars(result);
    };

    const remove = async () => {
        try {
            await API.car.delete(car.carId).then(getAll).then(toggleConfirmationModal);
        } catch (e) {

        }
    };

    const handleAction = (i, action) => () => {
        setCar(cars[i]);
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
            <h1>Cars</h1>
            <p>Add, edit or remove Car</p>
            <p><Button variant="primary" onClick={handleAction()}><FontAwesomeIcon icon={faPlus} /> Add new car</Button></p>
            <Table striped bordered responsive size="sm">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Color</th>
                        <th>Plates</th>
                        <th>Number of Seats</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {!cars && "Loading..."}
                    {cars && cars.map((car, i) => 
                        <tr key={car.carId}>
                            <td width="20%">{car.name}</td>
                            <td width="20%">{car.type}</td>
                            <td>{car.color}</td>
                            <td>{car.plates}</td>
                            <td>{car.seatsNumber}</td>
                            <td align="center" width="8%"><Button variant="info" size="sm" onClick={handleAction(i, 1)}><FontAwesomeIcon icon={faEdit} /> Edit</Button></td>
                            <td align="center" width="8%"><Button variant="danger" size="sm" onClick={handleAction(i, 2)}><FontAwesomeIcon icon={faTrash} /> Delete</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <AddModal isShowing={isAddShowing} hide={toggleAddModal} getAll={getAll} />
            <EditModal isShowing={isEditShowing} hide={toggleEditModal} car={car} getAll={getAll} />
            <ConfirmationModal isShowing={isConfirmationShowing} hide={toggleConfirmationModal} confirm={remove} />
        </Col>
    );
};
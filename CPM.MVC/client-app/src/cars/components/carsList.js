import React, { useState, useEffect } from 'react';
import { Col, Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { API } from '../../core';
import { EditModal, useModal } from '../';

export function Cars() {
    const [cars, setCars] = useState([]);
    const [car, setCar] = useState({});
    const { isShowing, toggle } = useModal();

    useEffect(() => {
        getAll();
    }, []);

    const getAll = async () => {
        const result = await API.car.getAll();
        setCars(result);
    };

    const edit = (i) => () => {
        setCar(cars[i]);
        toggle();
    }

    return (
        <Col>
            <h1>Cars</h1>
            <p>Add, edit or remove Car</p>
            <p><Button variant="primary" onClick={() => this.handleModalShow("addModalShow")}><FontAwesomeIcon icon={faPlus} /> Add new car</Button></p>
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
                    {cars && cars.map((car, i) => (
                        <tr key={car.carId}>
                            <td width="20%">{car.name}</td>
                            <td width="20%">{car.type}</td>
                            <td>{car.color}</td>
                            <td>{car.plates}</td>
                            <td>{car.seatsNumber}</td>
                            <td align="center" width="8%"><Button variant="info" size="sm" onClick={edit(i)}><FontAwesomeIcon icon={faEdit} /> Edit</Button></td>
                            <td align="center" width="8%"><Button variant="danger" size="sm" onClick={() => this.handleModalShow("deleteModalShow", car.carId)}><FontAwesomeIcon icon={faTrash} /> Delete</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <EditModal isShowing={isShowing} hide={toggle} car={car} getAll={getAll} />
        </Col>
    );
}
import React, { Component } from 'react';
import Loader from 'react-loader-spinner'
import { Button, Glyphicon } from 'react-bootstrap'
import Api from '../services/Api'
import { CarAddModal, CarEditModal, ConfirmationModal } from './';

export class Cars extends Component {
    constructor(props) {
		super(props);

        this.state = {
            carId: undefined,
            car: undefined,
            cars: [],
            loading: true,
            modals: {
                addModalShow: false,
                editModalShow: false,
                deleteModalShow: false
            }
        };
    }

    componentDidMount() {
        this.getAllCars();
    };

    handleModalShow = (modalName, carId) => {
        this.setState(prevState => {
            switch (modalName) {
                case 'editModalShow':
                    prevState.car = prevState.cars.find(c => c.carId === carId)
                    break;
                default:
                    break;
            }
            prevState.modals[modalName] = !prevState.modals[modalName];
            prevState.carId = carId;
            return prevState;
        });
    };

    getAllCars = async () => {
        let cars = await Api.car.getAllCars();
        this.setState({ cars, loading: false });
    };

    deleteCar = async id => {
        await Api.car.deleteCar(id).then(() => this.getAllCars());
    };

    renderCarsData(cars) {
        return (
            <div>
                <Button bsStyle="primary" size="large" onClick={() => this.handleModalShow("addModalShow")}><Glyphicon glyph='plus' /> Add new car</Button>
                <table className='table'>
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
                        {cars.map(car =>
                            <tr key={car.carId}>
                                <td width="30%">{car.name}</td>
                                <td width="30%">{car.type}</td>
                                <td>{car.color}</td>
                                <td>{car.plates}</td>
                                <td>{car.seatsNumber}</td>
                                <td><Button bsStyle="info" onClick={() => this.handleModalShow("editModalShow", car.carId)}><Glyphicon glyph='pencil' /> Edit</Button></td>
                                <td><Button bsStyle="danger" onClick={() => this.handleModalShow("deleteModalShow", car.carId)}><Glyphicon glyph='remove' /> Delete</Button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <CarAddModal
                    show={this.state.modals["addModalShow"]}
                    onHide={() => this.handleModalShow("addModalShow")}
                    getAllCars={this.getAllCars}
                />
                <CarEditModal
                    show={this.state.modals["editModalShow"]}
                    onHide={() => this.handleModalShow("editModalShow")}
                    getAllCars={this.getAllCars}
                    {...this.state.car}
                />
                <ConfirmationModal
                    show={this.state.modals["deleteModalShow"]}
                    onHide={() => this.handleModalShow("deleteModalShow")}
                    onConfirm={() => this.deleteCar(this.state.carId)}
                />
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <Loader type="ThreeDots" color="#00000" height={100} width={100} />
            : this.renderCarsData(this.state.cars);

        return (
            <div>
                <h1>Cars</h1>
                <p>Add, edit or remove Car</p>
                {contents}
            </div>
        );
    }
}

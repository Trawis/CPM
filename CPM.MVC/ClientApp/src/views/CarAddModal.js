import React, { Component } from 'react';
import { Form, Modal, Button, Glyphicon, Row, Col, Alert } from 'react-bootstrap';
import Api from '../services/Api';
import { Textbox } from '../components';

export class CarAddModal extends Component {
    state = {
        name: '',
        type: '',
        color: '',
        plates: '',
        seatsNumber: '',
        errors: undefined
    };

    componentWillReceiveProps() {
        this.setState({
            name: '',
            type: '',
            color: '',
            plates: '',
            seatsNumber: '',
            errors: undefined
        })
    };

    handleChange = (e) => {
        let target = e.target;

        this.setState(prevState => {
            prevState[target.name] = target.value;
            return prevState;
        });
    };

    addCar = async () => {
        try {
            await Api.car.addCar(this.state);
            await this.props.getAllCars();
            await this.props.onHide();
        } catch (e) {
            this.setState({ errors: e.errors.map(error => error.message) });
        }
    };

    render() {
        const { errors, name, type, color, plates, seatsNumber } = this.state;
        const { onHide, show } = this.props;

        return (
            <Modal bsSize="large" show={show} onHide={onHide} backdrop="static">
                <Modal.Header className="modal-header" closeButton>
                    <Modal.Title>
                        Add new car
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
                                    id="nameId"
                                    name="name"
                                    label="Name"
                                    value={name}
                                    onChange={this.handleChange}
                                />
                            </Col>
                            <Col md={6}>
                                <Textbox
                                    id="typeId"
                                    name="type"
                                    label="Type"
                                    value={type}
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Textbox
                                    id="colorId"
                                    name="color"
                                    label="Color"
                                    value={color}
                                    onChange={this.handleChange}
                                />
                            </Col>
                            <Col md={4}>
                                <Textbox
                                    id="platesId"
                                    name="plates"
                                    label="Plates"
                                    value={plates}
                                    onChange={this.handleChange}
                                />
                            </Col>
                            <Col md={4}>
                                <Textbox
                                    id="seatsNumberId"
                                    name="seatsNumber"
                                    type="number"
                                    label="Seats Number"
                                    value={seatsNumber}
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="modal-footer d-inline">
                    <Button bsStyle="primary" className="pull-left" size="large" onClick={() => this.addCar()}><Glyphicon glyph='floppy-disk' /> Save</Button>
                    <Button bsStyle="default" className="pull-right" size="large" onClick={onHide}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    };
}
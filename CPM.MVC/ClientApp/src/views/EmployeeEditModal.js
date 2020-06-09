import React, { Component } from 'react';
import { Form, Modal, Button, Glyphicon, Row, Col, Alert } from 'react-bootstrap';
import Api from '../services/Api';
import { Textbox, CheckBox } from '../components';

export class EmployeeEditModal extends Component {
    state = {
        name: '',
        isDriver: false,
        errors: undefined
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.employeeId !== undefined) {
            this.setState({
                ...nextProps,
                errors: undefined
            })
        }
    };

    handleChange = (e) => {
        let target = e.target;

        this.setState(prevState => {
            prevState[target.name] = target.type !== 'checkbox' ? target.value : target.checked;
            return prevState;
        });
    };

    updateEmployee = async () => {
        try {
            await Api.employee.updateEmployee(this.state);
            await this.props.getAllEmployees();
            await this.props.onHide();
        } catch (e) {
            this.setState({ errors: e.errors.map(error => error.message) });
        }
    };

    render() {
        const { errors, name, isDriver } = this.state;
        const { onHide, show } = this.props;

        return (
            <Modal bsSize="large" show={show} onHide={onHide} backdrop="static">
                <Modal.Header className="modal-header" closeButton>
                    <Modal.Title>
                        Edit employee
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
                        </Row>
                        <Row>
                            <Col md={6}>
                                <CheckBox
                                    id="isDriverId"
                                    name="isDriver"
                                    label="Is Driver"
                                    checked={isDriver}
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="modal-footer d-inline">
                    <Button bsStyle="primary" className="pull-left" size="large" onClick={() => this.updateEmployee()}><Glyphicon glyph='floppy-disk' /> Save</Button>
                    <Button bsStyle="default" className="pull-right" size="large" onClick={onHide}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    };
}
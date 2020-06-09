import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap';

export class ConfirmationModal extends Component {
    render() {
        const { onHide, show, onConfirm } = this.props;

        return (
            <Modal bsSize="small" show={show} onHide={onHide} backdrop="static">
                <Modal.Header className="modal-header" closeButton>
                    <Modal.Title>
                        Confirm action?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body">
                    <h4>Are you sure that you want to confirm the action?</h4>
                </Modal.Body>
                <Modal.Footer className="modal-footer d-inline">
                    <Button bsStyle="danger" className="pull-left" size="large" onClick={() => { onConfirm(); onHide(); }}>Confirm</Button>
                    <Button bsStyle="default" className="pull-right" size="large" onClick={onHide}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    };
}
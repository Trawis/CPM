import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export const ConfirmationModal = ({ isShowing, hide, confirm }) => {
    return (
        <Modal size="sm" show={isShowing} onHide={hide} backdrop="static" centered>
            <Modal.Header className="modal-header" closeButton>
                <Modal.Title>
                    Confirm action?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body">
                <h5>Are you sure that you want to confirm the action?</h5>
            </Modal.Body>
            <Modal.Footer className="modal-footer d-inline">
                <Button variant="danger" className="pull-left" onClick={confirm}>Confirm</Button>
                <Button variant="default" className="pull-right" onClick={hide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
};
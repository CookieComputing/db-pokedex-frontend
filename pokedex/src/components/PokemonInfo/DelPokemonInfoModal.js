import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function DelModal({ show, handleClose, handleDel, national_num }) {
    let payload = {
        national_num: parseInt(national_num),
    }

    return <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete a Pokemon Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete it? :(
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={() => handleDel(payload)}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { regions } from '../utils/Types';
const { useState, useEffect } = React;

// Assumes that the team being added is to a specific trainer!
export default function AddTeamsModal({ show, handleClose, handleSave, trainerId}) {
    const [name, setName] = useState("")

    let payload = {
        trainer: trainerId,
        name: name,
    }

    return <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add a team for this trainer!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                    <br />
                </Form >
            </Modal.Body >
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => {handleSave(payload)}}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal >
    </>
}
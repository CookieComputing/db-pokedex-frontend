import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
const { useState, useEffect } = React;

export default function AddModal({ show, handleClose, pokemonTrainer, handleSave }) {
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [username, setUsername] = useState("")

    let payload = {
        first_name,
        last_name,
        username

    }

    return <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add a Trainer!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        placeholder="Enter First Name"
                        value={first_name}
                        onChange={(e) => setFirstName(e.target.value)} />
                    <br />
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        placeholder="Enter Last Name"
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)} />
                    <br />
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} />

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleSave(payload)}>
                    Create
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}
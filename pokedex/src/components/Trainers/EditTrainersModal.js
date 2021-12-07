import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
const { useState, useEffect } = React;

export default function EditModal({ show, handleClose, pokemonTrainer, handleEdit, pokemonTrainerIndex }) {
    const [pk, setPK] = useState("")
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    useEffect(() => {
        if (pokemonTrainer.length !== 0) {
            let currTrainer = pokemonTrainer[pokemonTrainerIndex]
            let currTrainerFields = currTrainer.fields

            setPK(currTrainer.pk)
            setFirstName(currTrainerFields.first_name)
            setLastName(currTrainerFields.last_name)
            setUsername(currTrainerFields.username)
            setPassword(currTrainerFields.password)
            setEmail(currTrainerFields.email)
        }
    }, [pokemonTrainerIndex])

    let payload = {
        pk,
        first_name,
        last_name,
        username,
        password,
        email
    }

    return <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit a Trainer!</Modal.Title>
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
                        placeholder="Enter First Name"
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)} />
                    <br />
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} />
                    <br />
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <br />
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </Form >
            </Modal.Body >
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleEdit(payload)}>
                    Edit
                </Button>
            </Modal.Footer>
        </Modal >
    </>
}
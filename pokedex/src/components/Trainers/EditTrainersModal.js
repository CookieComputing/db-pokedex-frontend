import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { formatReactDob, formatRealDob, parseDob } from '../utils/functions';
const { useState, useEffect } = React;

export default function EditModal({ show, handleClose, pokemonTrainer, handleEdit, pokemonTrainerIndex }) {
    const [pk, setPK] = useState("")
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    // This is a dob that is used by the bootstrap component to render
    // dates
    const [reactDob, setReactDob] = useState("")

    // This is the date of birth used by the backend
    const [realDob, setRealDob] = useState("")

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
            
            // Refer to backend API for formatting
            // https://github.com/CookieComputing/db-pokedex-backend#trainer-api
            var dob = new Date()
            if (currTrainerFields.date_of_birth.length !== 0) {
                dob = parseDob(currTrainerFields.date_of_birth)
            }
            
            setReactDob(formatReactDob(dob))
            setRealDob(formatRealDob(dob))
        }
    }, [pokemonTrainerIndex])

    let payload = {
        pk,
        first_name,
        last_name,
        username,
        password,
        email,
        date_of_birth: realDob
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
                        placeholder="Enter Last Name"
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
                    <br />
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                        type="date"
                        name="date_of_birth"
                        value={reactDob}
                        onChange={(e) => {
                            const dateObj = parseDob(e.target.value);
                            setReactDob(formatReactDob(dateObj));
                            setRealDob(formatRealDob(dateObj))}} />
                </Form >
            </Modal.Body >
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleEdit(payload)}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal >
    </>
}
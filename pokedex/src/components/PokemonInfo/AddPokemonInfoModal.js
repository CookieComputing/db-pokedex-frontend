import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
const { useState } = React;
// TODO: Fix evolve and devolve later

export default function AddModal({ show, handleClose, pokemonInfo, handleSave }) {
    const [nationalNumber, setNationalNumber] = useState("")
    const [name, setName] = useState("")
    const [photoUrl, setPhotoUrl] = useState("")
    const [description, setDescription] = useState("")
    const [devolvedState, setDevolvedState] = useState("")
    const [evolvedState, setEvolvedState] = useState("")

    let payload = {
        national_num: parseInt(nationalNumber),
        name,
        photo_url: photoUrl, description
    }
    if (evolvedState !== "Select" && evolvedState.length !== 0) {
        payload.evolved_state_pkid = parseInt(evolvedState.split(" ")[0])
    }
    if (devolvedState !== "Select" && devolvedState.length !== 0) {
        payload.devolved_state_pkid = parseInt(devolvedState.split(" ")[0])
    }

    return <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add a Pokemon Info!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>National Number</Form.Label>
                    <Form.Control
                        placeholder="Enter national number"
                        value={nationalNumber}
                        onChange={(e) => setNationalNumber(e.target.value)} />
                    <br />
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                    <br />
                    <Form.Label>Photo Url</Form.Label>
                    <Form.Control
                        placeholder="Enter photo url"
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)} />
                    <br />
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} />
                    <br />
                    <Form.Label>Devolved State</Form.Label>
                    <Form.Select
                        value={devolvedState}
                        onChange={(e) => setDevolvedState(e.target.value)}>
                        <option>Select</option>
                        {pokemonInfo.map((info) => {
                            return <option key={info.pk}>{info.pk} {info.fields.name}</option>
                        })}
                    </Form.Select>
                    <br />
                    <Form.Label>Evolved State</Form.Label>
                    <Form.Select
                        value={evolvedState}
                        onChange={(e) => setEvolvedState(e.target.value)}>
                        <option>Select</option>
                        {pokemonInfo.map((info) => {
                            return <option key={info.pk}>{info.pk} {info.fields.name}</option>
                        })}
                    </Form.Select>
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
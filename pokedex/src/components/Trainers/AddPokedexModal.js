import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { regions } from '../utils/Types';
const { useState, useEffect } = React;

// Assumes that the pokedex being added is to a specific trainer!
export default function AddPokedexModal({ show, handleClose, handleSave, trainerId}) {
    const [region, setRegion] = useState("")

    let payload = {
        trainer: trainerId,
        region,
    }

    return <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add a Pokedex for this trainer!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Region</Form.Label>
                    <Form.Select
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}>
                        <option>Select</option>
                        {regions.map((region, index) => {
                            return <option key={index}>{region}</option>
                        })}
                    </Form.Select>
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
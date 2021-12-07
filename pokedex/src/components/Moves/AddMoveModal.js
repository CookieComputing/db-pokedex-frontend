import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
const { useState } = React;

export default function AddModal({ show, handleClose, handleSave}) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [elementType, setElementType] = useState("")
    const [moveType, setMoveType] = useState("")
    const elemEnumType = ["normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison", "ground",
                    "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy", "shadow"]
    const moveEnumType = ["physical", "special", "status"]

    let payload = {
        name,
        description,
        element_type: elementType,
        move_type: moveType
    }

    return <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a Move!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)} />
                        <br />
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} />
                        <br />
                        <Form.Label>Element Type</Form.Label>
                        <Form.Select
                            value={elementType}
                            onChange={(e) => setElementType(e.target.value)}>
                            <option>Select</option>
                            {elemEnumType.map((elem) => {
                                return <option key={elem}>{elem}</option>
                            })}
                        </Form.Select>
                        <br />
                        <Form.Label>Move Type</Form.Label>
                        <Form.Select
                            value={moveType}
                            onChange={(e) => setMoveType(e.target.value)}>
                            <option>Select</option>
                            {moveEnumType.map((elem) => {
                                return <option key={elem}>{elem}</option>
                            })}
                        </Form.Select>
                        <br />
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
}
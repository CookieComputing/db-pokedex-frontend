import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
const { useState, useEffect } = React;

export default function AddModal({ show, handleClose, move, handleSave, handleUpdate, handleDelete }) {
    const [moveId, setMoveId] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [elementType, setElementType] = useState("")
    const [moveType, setMoveType] = useState("")

    let payload = {
        move_id: parseInt(moveId),
        name,
        description,
        element_type: elementType,
        move_type: moveType
    }

       return <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add a Move!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Move ID</Form.Label>
                    <Form.Control
                        placeholder="Enter move id"
                        value={moveId}
                        onChange={(e) => setMoveId(e.target.value)} />
                    <br />
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
                    <Form.Control
                        placeholder="Enter element type"
                        value={elementType}
                        onChange={(e) => setElementType(e.target.value)} />
                    <br />
                    <Form.Label>Move Type</Form.Label>
                    <Form.Control
                        placeholder="Enter move type"
                        value={moveType}
                        onChange={(e) => setMoveType(e.target.value)} />
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
                <Button variant="primary" onClick={() => handleUpdate(payload)}>
                    Update
                </Button>
                <Button variant="primary" onClick={() => handleDelete(payload)}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}
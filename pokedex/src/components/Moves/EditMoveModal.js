import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
const { useState, useEffect } = React;

export default function EditMoveModal({ show, handleClose, handleUpdate, moves, moveIndex}) {
    const [moveId, setMoveId] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [elementType, setElementType] = useState("")
    const [moveType, setMoveType] = useState("")

    let payload = {
        move_id: moveId,
        name,
        description,
        element_type: elementType,
        move_type: moveType
    }

    useEffect(() => {
        if (moves.length !== 0) {
            let currInfo = moves[moveIndex]
            let currInfoFields = currInfo.fields
            setMoveId(currInfo.pk)
            setName(currInfoFields.name)
            setDescription(currInfoFields.description)
            setElementType(currInfoFields.element_type)
            setMoveType(currInfoFields.move_type)
        }
    }, [moveIndex])

    return <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit a Move!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label>Move Id</Form.Label>
                        <Form.Control
                            defaultValue={moveId}
                            plaintext
                            readOnly />
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
                    <Button variant="primary" onClick={() => handleUpdate(payload)}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
}
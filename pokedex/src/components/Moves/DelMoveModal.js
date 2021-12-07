import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';

export default function DelMoveModal({ show, handleClose, handleDelete, moves, moveIndex }) {
    const [moveId, setMoveId] = useState([])
    let payload = {
        move_id: parseInt(moveId),
    }
    
    useEffect(() => {
        if (moves.length !== 0) {
            let currInfo = moves[moveIndex]
            setMoveId(currInfo.pk)
        }
    }, [moveIndex])

    return <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete a Move</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete it? :(
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={() => handleDelete(payload)}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}
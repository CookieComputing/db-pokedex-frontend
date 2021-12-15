import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function DelPokemonModal({ show, handleClose, handleDel, pokemonId }) {
    let payload = {
        pokemonId: parseInt(pokemonId),
    }

    return <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete a Pokemon</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete it? :(
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={() => handleDel(payload)}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}
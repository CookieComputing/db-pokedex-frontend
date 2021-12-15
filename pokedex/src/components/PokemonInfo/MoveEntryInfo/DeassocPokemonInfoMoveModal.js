import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function DeassocPokeInfoMoveModal({ show, handleClose, handleDeassoc, moveId, pokemonInfoId }) {

    let payload = {
        move: moveId,
        pokemon_info: pokemonInfoId
    }
    
    return <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Deassociate move</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to deassociate this pokemon with this pokedex?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={() => handleDeassoc(payload)}>
                    Deassociate
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}
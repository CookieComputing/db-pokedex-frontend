import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
const { useState } = React;

export default function AssocPokemonInfoMoveModal({ show, handleClose, handleAssoc, pokemonInfoId, moves}) {
    const [moveId, setMoveId] = useState("")

    let payload = {
        move: (moveId.length === 0) ? -1 : parseInt(moveId.split(",")[1], 10),
        pokemon_info: pokemonInfoId,
    }

    return <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Teach this pokemon a new move!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Moves</Form.Label>
                    <Form.Select
                        value={moveId}
                        onChange={(e) => setMoveId(e.target.value)}>
                        <option>Select,-1</option>
                        {moves.map((move, index) => {
                            return <option key={`assoc-pokemoninfo-pokedex-${index}`}>{move.fields.name},{move.pk}</option>
                        })}
                    </Form.Select>
                </Form >
            </Modal.Body >
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => {handleAssoc(payload)}}>
                    Add
                </Button>
            </Modal.Footer>
        </Modal >
    </>
}
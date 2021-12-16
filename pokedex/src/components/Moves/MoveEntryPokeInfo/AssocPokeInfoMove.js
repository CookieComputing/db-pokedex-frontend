import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
const { useState } = React;

// This is similar to the other one, but from the perspective of moves, retrieving pokemon info
export default function AssocPokeInfoMoveModal({ show, handleClose, handleAssoc, pokemonInfo, moveId}) {
    const [pokemonInfoId, setPokemonInfoId] = useState("")

    let payload = {
        move: moveId,
        pokemon_info: (pokemonInfoId.length === 0) ? -1 : parseInt(pokemonInfoId.split(",")[1], 10),
    }

    return <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Teach a pokemon this move!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Moves</Form.Label>
                    <Form.Select
                        value={pokemonInfoId}
                        onChange={(e) => setPokemonInfoId(e.target.value)}>
                        <option>Select,-1</option>
                        {pokemonInfo.map((pokeInfo, index) => {
                            return <option key={`assoc-pokemoninfo-pokedex-${index}`}>{pokeInfo.fields.name},{pokeInfo.pk}</option>
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
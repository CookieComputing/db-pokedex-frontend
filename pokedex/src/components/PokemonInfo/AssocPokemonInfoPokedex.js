import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { findAllPokedexes } from '../../api/PokedexAPI';
const { useState, useEffect } = React;

export default function AssocPokemonInfoPokedexModal({ show, handleClose, handleAssoc, pokemonInfoId}) {
    const [pokedexes, setPokedexes] = useState([])
    const [pokedexId, setPokedexId] = useState("")

    let payload = {
        pokedex: (pokedexId.length === 0) ? -1 : parseInt(pokedexId.split(",")[1], 10),
        pokemon_info: pokemonInfoId,
    }

    useEffect(() => {
        if (pokemonInfoId !== undefined) {
            findAllPokedexes().then((pokedexes) => {setPokedexes(pokedexes)})
        }
    }, [pokemonInfoId])

    return <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Track this pokemon with a Pokedex!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Pokedexes</Form.Label>
                    <Form.Select
                        value={pokemonInfoId}
                        onChange={(e) => setPokedexId(e.target.value)}>
                        <option>Select,-1</option>
                        {pokedexes.map((pokedex, index) => {
                            return <option key={`assoc-pokemoninfo-pokedex-${index}`}>Trainer {pokedex.fields.trainer}'s {pokedex.fields.region} pokedex,{pokedex.pk}</option>
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
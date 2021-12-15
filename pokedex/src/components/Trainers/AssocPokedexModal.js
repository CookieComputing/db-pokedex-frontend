import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { regions } from '../utils/Types';
import { findAllPokemonInfo } from '../../api/PokemonInfoAPI';
const { useState, useEffect } = React;

// Assumes that the pokedex being added is to a specific trainer!
export default function AssocPokedexModal({ show, handleClose, handleAssoc, pokedexId}) {
    const [pokemonInfo, setPokemonInfo] = useState([])
    const [pokemonInfoId, setPokemonInfoId] = useState("")

    let payload = {
        pokedex: pokedexId,
        pokemon_info: (pokemonInfo.length === 0) ? -1 : parseInt(pokemonInfoId.split(",")[1], 10),
    }

    useEffect(() => {
        if (pokedexId !== undefined) {
            findAllPokemonInfo().then((pokemonInfo) => {setPokemonInfo(pokemonInfo)})
        }
    }, [pokedexId])

    return <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add a new pokemon to this Pokedex!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Pokemon</Form.Label>
                    <Form.Select
                        value={pokemonInfoId}
                        onChange={(e) => setPokemonInfoId(e.target.value)}>
                        <option>Select,-1</option>
                        {pokemonInfo.map((pokeInfo, index) => {
                            return <option key={`assoc-pokedex-${index}`}>{pokeInfo.fields.name},{pokeInfo.pk}</option>
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
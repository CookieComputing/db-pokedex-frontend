import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { genders } from '../../utils/Types';
const { useState, useEffect } = React;

export default function EditPokemonModal({ show, handleClose, handleEdit, pokemon, pokemonIndex }) {
    const [nickname, setNickname] = useState("")
    const [gender, setGender] = useState("")

    let payload = {
        nickname,
        gender,
    }

    useEffect(() => {
        if (pokemonIndex !== undefined && pokemon.length !== 0) {
            let curPokemon = pokemon[pokemonIndex]
            setNickname(curPokemon.fields.nickname)
            setGender(curPokemon.fields.gender)
        }
    }, [pokemonIndex])

    return <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit this pokemon's data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Nickname</Form.Label>
                    <Form.Control
                        placeholder="Enter nickname"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)} />
                    <br />
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}>
                        <option>Select</option>
                        {genders.map((gender) => {
                            return <option key={gender}>{gender}</option>
                        })}
                    </Form.Select>
                    <br />
                </Form >
            </Modal.Body >
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleEdit(pokemon[pokemonIndex]?.pk, payload)}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal >
    </>
}
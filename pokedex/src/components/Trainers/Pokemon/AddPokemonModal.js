import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { findAllPokemonInfo } from '../../../api/PokemonInfoAPI';
import { genders } from '../../utils/Types';
const { useState, useEffect } = React;

export default function AddPokemonModal({ show, handleClose, handleSave, teamId }) {
    const [nickname, setNickname] = useState("")
    const [gender, setGender] = useState("")
    const [pokemonInfoId, setPokemonInfoId] = useState("")
    const [pokemonInfo, setPokemonInfo] = useState([])

    let payload = {
        nickname,
        gender,
        team: teamId,
        pokemon_info: parseInt(pokemonInfoId.split(",")[1], 10)
    }

    useEffect(() => {
        if (teamId !== undefined) {
            findAllPokemonInfo().then(pokeInfo => setPokemonInfo(pokeInfo))
        }
    }, [teamId])

    return <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add a Pokemon to this team!</Modal.Title>
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
                    <Form.Label>Pokemon Species</Form.Label>
                    <Form.Select
                        value={pokemonInfoId}
                        onChange={(e) => setPokemonInfoId(e.target.value)}>
                        <option>Select,-1</option>
                        {pokemonInfo.map((pokeInfo) => {
                            return <option key={pokeInfo.pk}>{pokeInfo.fields.name},{pokeInfo.pk}</option>
                        })}
                    </Form.Select>
                    <br />
                </Form >
            </Modal.Body >
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleSave(payload)}>
                    Create
                </Button>
            </Modal.Footer>
        </Modal >
    </>
}
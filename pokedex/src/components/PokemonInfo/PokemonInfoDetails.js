// A component for rendering the details of a Pokemon Info, displaying all fields
// in the pokemon info instead of a subset.

import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Image } from 'react-bootstrap';
const { useState, useEffect } = React;

export default function PokemonInfoDetailsModal({ show, handleClose, pokemonInfo, pokemonInfoIndex }) {
    const [nationalNumber, setNationalNumber] = useState("")
    const [name, setName] = useState("")
    const [photoUrl, setPhotoUrl] = useState("")
    const [description, setDescription] = useState("")
    const [devolvedState, setDevolvedState] = useState("")
    const [evolvedState, setEvolvedState] = useState("")
    const [pokemonTypes, setPokemonTypes] = useState([])

    useEffect(() => {
        if (pokemonInfo.length !== 0) {
            let currInfo = pokemonInfo[pokemonInfoIndex]
            let currInfoFields = currInfo.fields

            let devolvedStateID = currInfoFields.devolved_state_pkid
            if (devolvedStateID !== null) {
                let devolvedPokemon = pokemonInfo.find(info => info.pk === devolvedStateID)
                setDevolvedState(`${devolvedStateID} ${devolvedPokemon.fields.name}`)
            } else {
                setDevolvedState("")
            }
            let evolvedStateID = currInfoFields.evolved_state_pkid
            if (evolvedStateID !== null) {
                let evolvedPokemon = pokemonInfo.find(info => info.pk === evolvedStateID)
                setEvolvedState(`${evolvedStateID} ${evolvedPokemon.fields.name}`)
            } else {
                setEvolvedState("")
            }

            setNationalNumber(currInfo.pk)
            setName(currInfoFields.name)
            setPhotoUrl(currInfoFields.photo_url)
            setDescription(currInfoFields.description)
            setPokemonTypes(currInfo.types)
            
        }
    }, [pokemonInfoIndex])
    return <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                National Number: <b>{nationalNumber}</b>
                <br />
                Name: <b>{name}</b>
                <br />
                Description: <i>{description}</i>
                <br />
                {(devolvedState.length === 0) ? null : <><p>Devolved State: {devolvedState}</p><br /></>}
                {(evolvedState.length === 0) ? null : <><p>Evolved State: {evolvedState}</p><br /></>}
                    {(pokemonTypes.length === 0) ? null :
                    <>
                    <b>Types: </b>
                    <ul>
                        {pokemonTypes.map((type, index) => <li key={index}>{type}</li>)}
                    </ul>
                    </>}
                Photo: <Image src={photoUrl} fluid />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}
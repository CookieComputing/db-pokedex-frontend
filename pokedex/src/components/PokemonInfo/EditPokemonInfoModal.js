import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { applyPokemonType, getPokemonTypesByNationalNum } from '../../api/PokemonTypeAPI';
import { elemEnumType } from '../utils/Types';
const { useState, useEffect } = React;
// TODO: Fix devolve and evolve later

export default function EditModal({ show, handleClose, pokemonInfo, handleEdit, pokemonInfoIndex }) {
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
            }
            let evolvedStateID = currInfoFields.evolved_state_pkid
            if (evolvedStateID !== null) {
                let evolvedPokemon = pokemonInfo.find(info => info.pk === evolvedStateID)
                setEvolvedState(`${evolvedStateID} ${evolvedPokemon.fields.name}`)
            }

            setNationalNumber(currInfo.pk)
            setName(currInfoFields.name)
            setPhotoUrl(currInfoFields.photo_url)
            setDescription(currInfoFields.description)
        }
    }, [pokemonInfoIndex])

    useEffect(() => {
        if (pokemonInfo.length !== 0) {
            let currInfo = pokemonInfo[pokemonInfoIndex]
            getPokemonTypesByNationalNum(currInfo.pk).then(types =>
                setPokemonTypes(types.map((type) => type.fields.type))
            )
        }
    }, [pokemonInfoIndex])

    let payload = {
        national_num: parseInt(nationalNumber),
        name,
        photo_url: photoUrl, description
    }
    if (evolvedState !== "Select" && evolvedState.length !== 0) {
        payload.evolved_state_pkid = parseInt(evolvedState.split(" ")[0])
    }
    if (devolvedState !== "Select" && devolvedState.length !== 0) {
        payload.devolved_state_pkid = parseInt(devolvedState.split(" ")[0])
    }

    return <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit a Pokemon Info!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                    <br />
                    <Form.Label>Photo Url</Form.Label>
                    <Form.Control
                        placeholder="Enter photo url"
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)} />
                    <br />
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} />
                    <br />
                    <Form.Label>Devolved State</Form.Label>
                    <Form.Select
                        value={devolvedState}
                        onChange={(e) => setDevolvedState(e.target.value)}>
                        <option key="devolve-select">Select</option>
                        {pokemonInfo.map((info, index ) => {
                            if (info.pk !== nationalNumber) {
                                return <option key={`devolve-${index}`}>{info.pk} {info.fields.name}</option>
                            }
                        })}
                    </Form.Select>
                    <br />
                    <Form.Label>Evolved State</Form.Label>
                    <Form.Select
                        value={evolvedState}
                        onChange={(e) => setEvolvedState(e.target.value)}>
                        <option key="evolve-select">Select</option>
                        {pokemonInfo.map((info, index) => {
                            if (info.pk !== nationalNumber) {
                                return <option key={`evolve-${index}`}>{info.pk} {info.fields.name}</option>
                            }
                        })}
                    </Form.Select>
                    <br />
                    <Form.Label>Pokemon types</Form.Label>
                    {
                        (pokemonTypes.length === 0) ? <br /> :
                        pokemonTypes.map((type, index) => {
                            return <>
                            <Form.Select
                                key={`type-${index}`}
                                value={type}
                                onChange={(e) => {
                                    const typeCopy = [...pokemonTypes];
                                    typeCopy[index] = e.target.value;
                                    setPokemonTypes(typeCopy)}}>
                                <option key={`type-normal`}>Select</option>
                                {elemEnumType.map((elemType, elemIndex) =>
                                    <option key={`${elemType}-${elemIndex.toString()}-${index}`}>{elemType}</option>)}
                            </Form.Select>
                            <br />
                            </>
                        })
                    }
                    <Button variant="primary" onClick={() => {
                        const typeCopy = [...pokemonTypes];
                        typeCopy.push("Select")
                        setPokemonTypes(typeCopy)
                    }}>Add entry</Button>
                    <Button variant="primary" onClick={() => {
                        const typeCopy = [...pokemonTypes];
                        typeCopy.pop()
                        setPokemonTypes(typeCopy)
                    }}>Remove last entry</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => {handleEdit(payload); applyPokemonType(nationalNumber, pokemonTypes)}}>
                    Edit
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
const { useState, useEffect } = React;
// TODO: Fix devolve and evolve later

export default function EditModal({ show, handleClose, pokemonTrainer, handleSave, pokemonTrainerIndex }) {
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [username, setUsername] = useState("")
    // const [devolvedState, setDevolvedState] = useState("")
    // const [evolvedState, setEvolvedState] = useState("")

    useEffect(() => {
        if (pokemonTrainer.length !== 0) {
            let currInfo = pokemonTrainer[pokemonTrainerIndex]
            let currInfoFields = currInfo.fields

            // let devolvedStateID = currInfoFields.devolved_state_pkid
            // if (devolvedStateID !== null) {
            //     let devolvedPokemon = pokemonTrainer.find(info => info.fields.devolved_state_pkid === devolvedStateID)
            //     setDevolvedState(`${devolvedStateID} ${devolvedPokemon.fields.name}`)
            // }
            // let evolvedStateID = currInfoFields.evolved_state_pkid
            // if (evolvedStateID !== null) {
            //     let evolvedPokemon = pokemonTrainer.find(info => info.fields.evolved_state_pkid === evolvedStateID)
            //     setEvolvedState(`${evolvedStateID} ${evolvedPokemon.fields.name}`)
            // }

            setFirstName(currInfoFields.first_name)
            setLastName(currInfoFields.last_name)
        }
    }, [pokemonTrainerIndex])

    let payload = {
        first_name,
        last_name,
        username
    }
    // if (evolvedState !== "Select" && evolvedState.length !== 0) {
    //     payload.evolved_state_pkid = parseInt(evolvedState.split(" ")[0])
    // }
    // if (devolvedState !== "Select" && devolvedState.length !== 0) {
    //     payload.devolvedState_pkid = parseInt(devolvedState.split(" ")[0])
    // }

    return <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit a Trainer!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        placeholder="Enter First Name"
                        value={first_name}
                        onChange={(e) => setFirstName(e.target.value)} />
                    <br />
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        placeholder="Enter First Name"
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)} />
                    <br />
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} />
                    {/* <br /> */}
                    {/* <Form.Label>Devolved State</Form.Label>
                    <Form.Select
                        value={devolvedState}
                        onChange={(e) => setDevolvedState(e.target.value)}>
                        <option>Select</option>
                        {pokemonTrainer.map((info) => {
                            return <option key={info.pk}>{info.pk} {info.fields.name}</option>
                        })}
                    </Form.Select>
                    <br />
                    <Form.Label>Evolved State</Form.Label>
                    <Form.Select
                        value={evolvedState}
                        onChange={(e) => setEvolvedState(e.target.value)}>
                        <option>Select</option>
                        {pokemonTrainer.map((info) => {
                            return <option key={info.pk}>{info.pk} {info.fields.name}</option>
                        })}
                    </Form.Select> */}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleSave(payload)}>
                    Edit
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}
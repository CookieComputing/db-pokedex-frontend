import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { findAllTrainers, updateTrainer } from '../../api/TrainerAPI';
import { regions } from '../utils/Types';
import { useNavigate } from 'react-router-dom';
import EditModal from './EditTrainersModal';
const { useState, useEffect } = React;

export default function EditPokedexModal({ show, handleClose, pokedexes, handleEdit, pokedexIndex }) {
    const [trainerId, setTrainerId] = useState(0)
    const [region, setRegion] = useState("")
    const [trainers, setTrainers] = useState([])
    const [pokedexId, setPokedexId] = useState(0)
    const [showTrainerModal, setShowTrainerModal] = useState(false)

    useEffect(() => {
        if (pokedexes.length !== 0) {
            let pokedex = pokedexes[pokedexIndex];
            let pokedexFields = pokedex.fields;
            setPokedexId(pokedex.pk)
            setTrainerId(pokedexFields.trainer)
            setRegion(pokedexFields.region)
        }
    }, [pokedexIndex])

    useEffect(() => {
        findAllTrainers().then(trainers => setTrainers(trainers))
    }, [pokedexIndex])

    const handleTrainerEdit = async (payload) => {
        await updateTrainer(payload);
        window.location.reload();
    }

    let payload = {
        trainer: trainerId,
        region,
    }

    return <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit a Pokedex!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Trainer</Form.Label>
                    <Form.Select
                        value={trainerId}
                        onChange={(e) => setTrainerId(parseInt(e.target.value, 10))}>
                        <option>Select</option>
                        {trainers.map((pokeTrainer) => {
                            return <option key={pokeTrainer.pk}>{pokeTrainer.pk}</option>
                        })}
                        </Form.Select>
                    <br />
                    <Form.Label>Region</Form.Label>
                    <Form.Select
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}>
                        <option>Select</option>
                        {regions.map((region, index) => {
                            return <option key={index}>{region}</option>
                        })}
                    </Form.Select>
                </Form >
            </Modal.Body >
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => {handleEdit(pokedexId, payload)}}>
                    Save
                </Button>
                <Button variant="primary" onClick={() => {
                    setShowTrainerModal(true)
                }}>
                    Edit Trainer
                </Button>
            </Modal.Footer>
        </Modal >
        <EditModal show={showTrainerModal}
                handleClose={() => setShowTrainerModal(false)}
                pokemonTrainer={trainers}
                handleEdit={handleTrainerEdit}
                pokemonTrainerIndex={(trainers.length === 0) ? -1 : trainers.findIndex((trainer) => trainer.pk === trainerId)} />
    </>
}
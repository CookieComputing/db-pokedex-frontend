import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { findAllTrainers, updateTrainer } from '../../api/TrainerAPI';
import EditModal from './EditTrainersModal';
const { useState, useEffect } = React;

export default function EditTeamsModal({ show, handleClose, teams, handleEdit, teamsIndex }) {
    const [trainerId, setTrainerId] = useState(0)
    const [teamId, setTeamId] = useState(0)
    const [name, setName] = useState("")
    const [trainers, setTrainers] = useState([])
    const [showTrainerModal, setShowTrainerModal] = useState(false)

    useEffect(() => {
        if (teams.length !== 0) {
            let team = teams[teamsIndex];
            let teamField = team.fields;
            setTeamId(team.pk)
            setTrainerId(teamField.trainer)
            setName(teamField.name)
        }
    }, [teamsIndex])

    useEffect(() => {
        findAllTrainers().then(trainers => setTrainers(trainers))
    }, [teamsIndex])

    const handleTrainerEdit = async (payload) => {
        await updateTrainer(payload);
        window.location.reload();
    }

    let payload = {
        trainer: trainerId,
        name,
    }

    return <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit a Team!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Team Name</Form.Label>
                    <Form.Control
                        placeholder="Enter Team Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                    <br />
                </Form >
            </Modal.Body >
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => {handleEdit(teamId, payload)}}>
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
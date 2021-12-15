// A component used to render a trainer's pokemon teams

import { useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { findTrainerById } from "../../api/TrainerAPI";
import Pages from "../Page";
import {
    useNavigate,
    useParams
  } from "react-router-dom";
import { createTeam, deleteTeam, findAllTeamsByTrainerId, updateTeamById } from "../../api/TeamsAPI";
import AddTeamsModal from "./AddTeamsModal";
import EditTeamsModal from "./EditTeamsModal";
import DelTeamsModal from "./DelTeamsModal";

export function Teams() {
    const [trainer, setTrainer] = useState({})
    const [teams, setTeams] = useState([])
    const [teamsAddModal, setTeamsAddModal] = useState(false)
    const [teamsEditModal, setTeamsEditModal] = useState(false)
    const [teamsDelModal, setTeamsDelModal] = useState(false)
    const [teamsIndex, setTeamsIndex] = useState(-1)

    let navigate = useNavigate();
    let { trainerId } = useParams();

    const handleEdit = async (id, payload) => {
        await updateTeamById(id, payload)
        window.location.reload()
    }

    const handleSave = async (payload) => {
        await createTeam(payload)
        window.location.reload()
    }

    const handleDel = async (primary_key) => {
        await deleteTeam(primary_key);
        window.location.reload()
    }

    useEffect(() => {
        if (trainerId !== undefined) {
            findTrainerById(trainerId)
                .then(trainer => {setTrainer(trainer); return trainer})
                .then(trainer => findAllTeamsByTrainerId(trainer.pk))
                .then(teams => setTeams(teams))
        }
    }, [trainerId])

    return <div>
        {
            (Object.keys(trainer).length === 0) ? null : 
            <>
            <h1>
                {trainer.fields.first_name} {trainer.fields.last_name}'s Teams
            </h1>
            <Pages itemsInPageLimit={10} items={teams}
            mapFn={(team, index) => <ListGroup.Item as="li"
                    className="d-flex justify-content-between align-items-start"
                    key={index}>
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{team.fields.name}</div>
                    </div>
                    <Button className="me-2" onClick={() => {
                        setTeamsIndex(index)
                        setTeamsEditModal(true)}
                    }>Edit</Button>
                    <Button className="me-2" onClick={() => {
                        setTeamsIndex(index)
                        setTeamsDelModal(true)}
                    }>Delete</Button>
                </ListGroup.Item>
            } />
            </>
        }
        <AddTeamsModal show={teamsAddModal}
                        handleClose={() => {setTeamsAddModal(false)}}
                        handleSave={handleSave}
                        trainerId={trainer.pk}/>
        <EditTeamsModal show={teamsEditModal} 
                        handleClose={() => {setTeamsEditModal(false)}} 
                        teams={teams}
                        handleEdit={handleEdit}
                        teamsIndex={teamsIndex}/>
        <DelTeamsModal show={teamsDelModal}
                        handleClose={() => {setTeamsDelModal(false)}}
                        handleDel={handleDel}
                        primary_key={teams[teamsIndex]?.pk} />
        <Button className="me-2" onClick={() => setTeamsAddModal(true)}>Add</Button>
        <Button className="me-2" onClick={() => navigate(-1)}>Back</Button>
    </div>
}
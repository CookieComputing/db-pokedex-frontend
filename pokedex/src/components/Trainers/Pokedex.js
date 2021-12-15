// A component used to render a trainer's pokedexes.

import { useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { createPokedex, deletePokedex, findAllPokedexesById, updatePokedexById } from "../../api/PokedexAPI";
import { findTrainerById } from "../../api/TrainerAPI";
import Pages from "../Page";
import {
    Route,
    Routes,
    useNavigate,
    useParams
  } from "react-router-dom";
import EditPokedexModal from "./EditPokedexModal";
import AddPokedexModal from "./AddPokedexModal";
import DelPokedexModal from "./DelPokedexModal";
import { PokedexEntry } from "./PokedexEntry";

export default function Pokedex() {
    return (
        <Routes>
            <Route path='/' element={
                <PokedexList />}>
            </Route>
            <Route path='/pokedex/:pokedexId' element={<PokedexEntry />} />
        </Routes>)
}

function PokedexList() {
    const [trainer, setTrainer] = useState({})
    const [pokedexes, setPokedexes] = useState([])
    const [pokedexAddModal, setPokedexAddModal] = useState(false)
    const [pokedexEditModal, setPokedexEditModal] = useState(false)
    const [pokedexDelModal, setPokedexDelModal] = useState(false)
    const [pokedexIndex, setPokedexIndex] = useState(-1)

    let navigate = useNavigate();
    let { trainerId } = useParams();

    const handleEdit = async (id, payload) => {
        await updatePokedexById(id, payload)
        window.location.reload()
    }

    const handleSave = async (payload) => {
        await createPokedex(payload)
        window.location.reload()
    }

    const handleDel = async (primary_key) => {
        await deletePokedex(primary_key);
        window.location.reload()
    }

    useEffect(() => {
        if (trainerId !== undefined) {
            findTrainerById(trainerId)
                .then(trainer => {setTrainer(trainer); return trainer})
                .then(trainer => findAllPokedexesById(trainer.pk))
                .then(pokedexes => setPokedexes(pokedexes))
        }
    }, [trainerId])

    return <div>
        {
            (Object.keys(trainer).length === 0) ? null : 
            <>
            <h1>
                {trainer.fields.first_name} {trainer.fields.last_name}'s Pokedexes
            </h1>
            <Pages itemsInPageLimit={10} items={pokedexes}
            mapFn={(pokedex, index) => <ListGroup.Item as="li"
                    className="d-flex justify-content-between align-items-start"
                    key={index}>
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{pokedex.fields.region}</div>
                    </div>
                    <Button className="me-2" onClick={() => {
                        navigate(`pokedex/${pokedex.pk}`)
                    }}>Known Pokemon</Button>
                    <Button className="me-2" onClick={() => {
                        setPokedexIndex(index)
                        setPokedexEditModal(true)}
                    }>Edit</Button>
                    <Button className="me-2" onClick={() => {
                        setPokedexIndex(index)
                        setPokedexDelModal(true)}
                    }>Delete</Button>
                </ListGroup.Item>
            } />
            </>
        }
        <AddPokedexModal show={pokedexAddModal}
                        handleClose={() => {setPokedexAddModal(false)}}
                        handleSave={handleSave}
                        trainerId={trainer.pk}/>
        <EditPokedexModal show={pokedexEditModal} 
                        handleClose={() => {setPokedexEditModal(false)}} 
                        pokedexes={pokedexes}
                        handleEdit={handleEdit}
                        pokedexIndex={pokedexIndex}/>
        <DelPokedexModal show={pokedexDelModal}
                        handleClose={() => {setPokedexDelModal(false)}}
                        handleDel={handleDel}
                        primary_key={pokedexes[pokedexIndex]?.pk} />
        <Button className="me-2" onClick={() => setPokedexAddModal(true)}>Add</Button>
        <Button className="me-2" onClick={() => navigate(-1)}>Back</Button>
    </div>
}
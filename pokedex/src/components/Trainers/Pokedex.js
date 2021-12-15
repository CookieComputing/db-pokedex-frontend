// A component used to render a trainer's pokedexes.

import { useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { findAllPokedexesById } from "../../api/PokedexAPI";
import { findTrainerById } from "../../api/TrainerAPI";
import Pages from "../Page";
import {
    useNavigate,
    useParams
  } from "react-router-dom";

export function PokedexList() {
    const [trainer, setTrainer] = useState({})
    const [pokedexes, setPokedexes] = useState([])

    let navigate = useNavigate();
    let { trainerId } = useParams();

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
                    <Button className="me-2">Details</Button>
                </ListGroup.Item>
            } />
            </>
        }
        <Button className="me-2" onClick={() => navigate(-1)}>Back</Button>
    </div>
}
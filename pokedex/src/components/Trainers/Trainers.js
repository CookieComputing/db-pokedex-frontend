import React from 'react';
import { createTrainer, findAllTrainers, updateTrainer, deleteTrainer } from '../../api/TrainerAPI';
import Tab from 'react-bootstrap/Tab';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button';
import AddTrainersModal from "./AddTrainersModal";
import EditTrainersModal from "./EditTrainersModal";
import DelTrainersModal from "./DelTrainersModal";

const { useState, useEffect } = React;

export default function Trainers(props) {
    return <div>
        <Container>
            <Row>
                <Col><PokemonTrainersList></PokemonTrainersList></Col>
            </Row>
        </Container>
    </div>
}

function PokemonTrainersList(props) {
    const [pokemonTrainer, setTrainerInfo] = useState([])
    const [pokemonTrainerIndex, setPokemonTrainerIndex] = useState(-1)
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [delModalVisible, setDelModalVisible] = useState(false);

    useEffect(() => {
        findAllTrainers().then(pokeTrainer => { setTrainerInfo(pokeTrainer) })
    }, [])

    const handleSave = async (payload) => {
        await createTrainer(payload);
        window.location.reload();
    }

    const handleEdit = async (payload) => {
        await updateTrainer(payload);
        window.location.reload();
    }

    const handleDel = async (payload) => {
        await deleteTrainer(payload);
        window.location.reload();
    }

    return <div>
        <h1>Trainers</h1>
        <ListGroup as='ol' numbered>
            {
                pokemonTrainer.map((pokeTrainer, index) =>
                    <ListGroup.Item as="li"
                        className="d-flex justify-content-between align-items-start"
                        key={pokeTrainer.pk}>
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">{pokeTrainer.fields.first_name} {pokeTrainer.fields.last_name}</div>
                        </div>
                        <Badge variant="dark" className="btn-primary me-2 align-self-center" pill>
                            {pokeTrainer.pk}
                        </Badge>
                        <Button className="me-2" onClick={() => {
                            setPokemonTrainerIndex(index)
                            setEditModalVisible(true)
                        }}>Edit</Button>
                        <Button variant="danger" onClick={() => {
                            setPokemonTrainerIndex(index)
                            setDelModalVisible(true)
                        }}>Delete</Button>
                    </ListGroup.Item>
                )
            }
        </ListGroup>
        <br />
        <Button onClick={() => setAddModalVisible(true)}>Add</Button>
        <AddTrainersModal
            show={addModalVisible}
            handleClose={() => setAddModalVisible(false)}
            handleSave={handleSave} />
        <EditTrainersModal
            show={editModalVisible}
            handleClose={() => setEditModalVisible(false)}
            pokemonTrainer={pokemonTrainer}
            handleEdit={handleEdit}
            pokemonTrainerIndex={pokemonTrainerIndex} />
        <DelTrainersModal
            show={delModalVisible}
            handleClose={() => setDelModalVisible(false)}
            handleDel={handleDel}
            primary_key={pokemonTrainer[pokemonTrainerIndex]?.pk} />
    </div>
}

// Components for handling Pokemon info

import React from 'react';
import { createPokemonInfo, findAllPokemonInfo, updatePokemonInfo } from '../../api/PokemonInfoAPI';
import Tab from 'react-bootstrap/Tab';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button';
import AddPokemonInfoModal from "./AddPokemonInfoModal";
import EditPokemonInfomodal from "./EditPokemonInfoModal";

const { useState, useEffect } = React;

// The main tab for rendering pokemon information
export function PokemonInfoTab(props) {
    return <div>
        <Container>
            <Row>
                <Col><PokemonInfoList></PokemonInfoList></Col>
            </Row>
        </Container>
    </div>
}

function PokemonInfoList(props) {
    const [pokemonInfo, setPokemonInfo] = useState([])
    const [pokemonInfoIndex, setPokemonInfoIndex] = useState(-1)
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);

    useEffect(() => {
        findAllPokemonInfo().then(pokeInfo => { setPokemonInfo(pokeInfo) })
    }, [])

    const handleSave = async (payload) => {
        await createPokemonInfo(payload);
        window.location.reload();
    }

    const handleEdit = async (payload) => {
        console.log(payload)
        await updatePokemonInfo(payload);
        // Artificial timeout for UI/UX reload
        setTimeout(function () {
            window.location.reload();
        }, 800);
    }

    return <div>
        <h1>Pokemon Info</h1>
        <ListGroup as='ol' numbered>
            {
                pokemonInfo.map((pokeInfo, index) =>
                    <ListGroup.Item as="li"
                        className="d-flex justify-content-between align-items-start"
                        key={pokeInfo.pk}>
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">{pokeInfo.fields.name}</div>
                        </div>
                        <Badge variant="dark" className="btn-primary me-2 align-self-center" pill>
                            {pokeInfo.pk}
                        </Badge>
                        <Button onClick={() => {
                            setPokemonInfoIndex(index)
                            setEditModalVisible(true)
                        }}>Edit</Button>
                    </ListGroup.Item>
                )
            }
        </ListGroup>
        <br />
        <Button onClick={() => setAddModalVisible(true)}>Add</Button>
        <AddPokemonInfoModal
            show={addModalVisible}
            handleClose={() => setAddModalVisible(false)}
            pokemonInfo={pokemonInfo}
            handleSave={handleSave} />
        <EditPokemonInfomodal
            show={editModalVisible}
            handleClose={() => setEditModalVisible(false)}
            pokemonInfo={pokemonInfo}
            handleSave={handleEdit}
            pokemonInfoIndex={pokemonInfoIndex} />
    </div>
}
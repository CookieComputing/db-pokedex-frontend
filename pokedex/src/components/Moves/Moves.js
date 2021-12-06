// Components for handling Pokemon info

import React from 'react';
import { createPokemonInfo, findAllPokemonInfo } from '../../api/PokemonInfoAPI';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button';
import AddMoveModal from "./AddMoveModal";
import { findAllMoves, updateMove, createMove, deleteMove } from '../../api/MoveAPI';
import { Col, Row } from 'react-bootstrap';
const { useState, useEffect } = React;

// Main component for rendering moves
export default function Moves(props) {
    return <div>
        <MovesList></MovesList>
    </div>
}

function MovesList(props) {
    const [moves, setMoves] = useState([])
    const [addModalVisible, setAddModalVisible] = useState(false);
    useEffect(() => {
        findAllMoves().then(moves => { setMoves(moves) })
    }, [])

    const handleSave = async (payload) => {
        await createMove(payload);
        window.location.reload();
    }
    
    const handleUpdate = async(payload) => {
        await updateMove(payload.move_id.toString(), payload);
        window.location.reload();
    }

    const handleDelete = async (payload) => {
        await deleteMove(payload.move_id.toString());
        setAddModalVisible(false);
        window.location.reload();
    }

    return <div>
        <h1>Moves</h1>
        <Row> 
            <Col><h3>Name</h3></Col>
            <Col><h3>Element Type</h3></Col>
            <Col><h3>Move Type</h3></Col>
        </Row>
        <Row>
            <ListGroup as='ol' numbered>
                {
                    moves.map(move =>
                        <ListGroup.Item as="li"
                            className="d-flex justify-content-between align-items-start"
                            key={move.pk}>
                            <div className="ms-2 me-auto">
                                <Row>
                                    <Col><div className="fw-bold">{move.fields.name}</div></Col>
                                    <Col><div className="fw-bold">{move.fields.element_type}</div></Col>
                                    <Col><div className="fw-bold">{move.fields.move_type}</div></Col>
                                </Row>
                            </div>
                            <Badge variant="primary" pill>
                                {move.pk}
                            </Badge>
                        </ListGroup.Item>
                    )
                }
            </ListGroup>
        </Row>
        <br />
        <Button onClick={() => setAddModalVisible(true)}>Add</Button>
        <AddMoveModal
            show={addModalVisible}
            handleClose={() => setAddModalVisible(false)}
            moves={moves}
            handleSave={handleSave}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete} />
    </div>
}

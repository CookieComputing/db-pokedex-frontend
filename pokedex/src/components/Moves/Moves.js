// Components for handling Pokemon info

import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button';
import AddMoveModal from "./AddMoveModal";
import { findAllMoves, updateMove, createMove, deleteMove } from '../../api/MoveAPI';
import EditMoveModal from './EditMoveModal';
import DelMoveModal from './DelMoveModal';
const { useState, useEffect } = React;

// Main component for rendering moves
export default function Moves(props) {
    return <div>
        <MovesList></MovesList>
    </div>
}
function MovesList(props) {
    const [moves, setMoves] = useState([])
    const [moveIndex, setMoveIndex] = useState("")
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    useEffect(() => {
        findAllMoves().then(moves => { setMoves(moves) })
    }, [])

    const handleSave = async (payload) => {
        await createMove(payload);
        window.location.reload();
    }

    const handleUpdate = async (payload) => {
        await updateMove(payload.move_id.toString(), payload);
        window.location.reload();
    }

    const handleDelete = async (payload) => {
        await deleteMove(payload.move_id.toString());
        window.location.reload();
    }

    return <div>
        <h1>Moves</h1>
        <ListGroup as='ol' numbered>
            {
                moves.map((move, index) =>
                    <ListGroup.Item as="li"
                        className="d-flex justify-content-between align-items-start"
                        key={move.pk}>
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">{move.fields.name}</div>
                        </div>
                        <Badge variant="primary" className="btn-primary me-2 align-self-center" pill>
                            {move.pk}
                        </Badge>
                        <Button className="me-2" onClick={() => {
                            setMoveIndex(index)
                            setEditModalVisible(true)
                        }}>Edit</Button>
                        <Button variant="danger" onClick={() => {
                            setMoveIndex(index)
                            setDeleteModalVisible(true)
                        }}>Delete</Button>
                    </ListGroup.Item>
                )
            }
        </ListGroup>
        <br />
        <AddMoveModal
            show={addModalVisible}
            handleClose={() => setAddModalVisible(false)}
            handleSave={handleSave} />
        <Button onClick={() => setAddModalVisible(true)}>Add</Button>
        <EditMoveModal
            show={editModalVisible}
            handleClose={() => setEditModalVisible(false)}
            handleUpdate={handleUpdate}
            moves={moves}
            moveIndex={moveIndex} />
        <DelMoveModal
            show={deleteModalVisible}
            handleClose={() => setDeleteModalVisible(false)}
            handleDelete={handleDelete}
            moves={moves}
            moveIndex={moveIndex} />
    </div>
}

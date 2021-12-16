// Components for handling Pokemon info

import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button';
import AddMoveModal from "./AddMoveModal";
import { findAllMoves, updateMove, createMove, deleteMove } from '../../api/MoveAPI';
import EditMoveModal from './EditMoveModal';
import DelMoveModal from './DelMoveModal';
import Pages from '../Page';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { PokeInfoList } from './MoveEntryPokeInfo/PokeInfoList';

// Main component for rendering moves
export default function Moves(props) {
    let navigate = useNavigate();
    return <div>
        <Routes>
            <Route path="/" element={<MovesList navigate={navigate}/>} />
            <Route path="/pokeInfo/:moveId" element={<PokeInfoList />} />
        </Routes>
    </div>
}
class MovesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            moves: [],
            moveIndex: 0,
            addModalVisible: false,
            editModalVisible: false,
            deleteModalVisible: false
        }
    }

    async handleSave(payload) {
        await createMove(payload);
        window.location.reload();
    }

    async handleUpdate(payload) {
        await updateMove(payload.move_id.toString(), payload);
        window.location.reload();
    }

    async handleDelete(payload) {
        await deleteMove(payload.move_id.toString());
        window.location.reload();
    }

    findMoveIndex(pk) {
        return this.state.moves.findIndex((move) => move.pk === pk)
    }

    componentDidMount() {
        findAllMoves().then(moves => { this.setState({moves: moves})})
    }

    render() {
        return <div>
            <h1>Moves</h1>
            <Pages itemsInPageLimit={10} items={this.state.moves}
            mapFn={(move) =>
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
                        this.props.navigate(`pokeInfo/${move.pk}`)
                    }}>Known Pokemon</Button>
                    <Button className="me-2" onClick={() => {
                        this.setState({
                            moveIndex: move.pk,
                            editModalVisible: true
                        })
                    }}>Edit</Button>
                    <Button variant="danger" onClick={() => {
                        this.setState({
                            moveIndex: move.pk,
                            deleteModalVisible: true
                        })
                    }}>Delete</Button>
                </ListGroup.Item>}/>
            <br />
            <AddMoveModal
                show={this.state.addModalVisible}
                handleClose={() => this.setState({addModalVisisble: false})}
                handleSave={this.handleSave} />
            <Button onClick={() => this.setState({addModalVisible: true})}>Add</Button>
            <EditMoveModal
                show={this.state.editModalVisible}
                handleClose={() => this.setState({editModalVisible: false})}
                handleUpdate={this.handleUpdate}
                moves={this.state.moves}
                moveIndex={this.findMoveIndex(this.state.moveIndex)} />
            <DelMoveModal
                show={this.state.deleteModalVisible}
                handleClose={() => this.setState({deleteModalVisible: false})}
                handleDelete={this.handleDelete}
                moves={this.state.moves}
                moveIndex={this.findMoveIndex(this.state.moveIndex)} />
        </div>
    }
}
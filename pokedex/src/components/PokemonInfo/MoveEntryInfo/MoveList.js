// Component responsible for rendering all the moves of a pokemon info

import { useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { findAllMoves, updateMove } from "../../../api/MoveAPI";
import { associatePokeInfoWithMove, deassociatePokeInfoWithMove, getMovesByPokemonInfo } from "../../../api/PokemonInfoAPI";
import EditMoveModal from "../../Moves/EditMoveModal";
import Pages from "../../Page";
import AssocPokemonInfoMoveModal from "./AssocPokemonInfoMoveModal";
import DeassocPokeInfoMoveModal from "./DeassocPokemonInfoMoveModal";


export function MoveList(props) {
    const [moves, setMoves] = useState([])
    const [editMoveModal, setEditMoveModal] = useState(false)
    const [moveIndex, setMoveIndex] = useState(-1)
    const [assocMoveModal, setAssocMoveModal] = useState(false)
    const [deassocMoveModal, setDeassocMoveModal] = useState(false)
    const [allMoves, setAllMoves] = useState([])

    let { pokemonInfoId } = useParams()

    let navigate = useNavigate();

    useEffect(() => {
        getMovesByPokemonInfo(pokemonInfoId)
        .then(moves => setMoves(moves))
    }, [pokemonInfoId])

    useEffect(() => {
        findAllMoves()
        .then(moves => setAllMoves(moves))
    }, [pokemonInfoId])

    const handleMoveEdit = async (payload) => {
        await updateMove(payload.move_id, payload);
        window.location.reload()
    }

    const handleAssoc = async (payload) => {
        await associatePokeInfoWithMove(payload)
        window.location.reload()
    }

    const handleDeassoc = async (payload) => {
        await deassociatePokeInfoWithMove(payload)
        window.location.reload()
    }

    return <div>
    {
        <>
        <h1>
            Associated moves
        </h1>
        <Pages itemsInPageLimit={10} items={moves}
        mapFn={(move, index) => <ListGroup.Item as="li"
                className="d-flex justify-content-between align-items-start"
                key={index}>
                <div className="ms-2 me-auto">
                    <div className="fw-bold">{move.fields.name}</div>
                </div>
                <Button className="me-2" onClick={() => {
                    setMoveIndex(index)
                    setEditMoveModal(true)}
                }>Edit</Button>
                <Button className="me-2" onClick={() => {
                    setMoveIndex(index)
                    setDeassocMoveModal(true)}
                }>Unlearn this move</Button>
            </ListGroup.Item>
        } />
        <EditMoveModal show={editMoveModal}
                    handleClose={() => setEditMoveModal(false)}
                    moves={moves}
                    handleUpdate={handleMoveEdit}
                    moveIndex={moveIndex} />
        <AssocPokemonInfoMoveModal show={assocMoveModal}
                    handleClose={() => setAssocMoveModal(false)}
                    handleAssoc={handleAssoc}
                    pokemonInfoId={pokemonInfoId}
                    moves={allMoves} />
        <DeassocPokeInfoMoveModal show={deassocMoveModal}
                    handleClose={() => setDeassocMoveModal(false)}
                    handleDeassoc={handleDeassoc}
                    moveId={moves[moveIndex]?.pk}
                    pokemonInfoId={pokemonInfoId} />
        <Button className="me-2" onClick={() => setAssocMoveModal(true)}>Learn a move</Button>
        <Button className="me-2" onClick={() => navigate(-1)}>Back</Button>
        </>
    }
    </div>
}
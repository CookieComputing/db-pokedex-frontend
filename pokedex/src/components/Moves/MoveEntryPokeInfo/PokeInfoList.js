// Component responsible for rendering all the moves of a pokemon info

import { useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getPokemonInfoByMove } from "../../../api/MoveAPI";
import { associatePokeInfoWithMove, deassociatePokeInfoWithMove, findAllPokemonInfo, getMovesByPokemonInfo, updatePokemonInfo } from "../../../api/PokemonInfoAPI";
import Pages from "../../Page";
import EditModal from "../../PokemonInfo/EditPokemonInfoModal";
import DeassocPokemonInfoMoveModal from "../../PokemonInfo/MoveEntryInfo/DeassocPokemonInfoMoveModal";
import AssocPokeInfoMoveModal from "./AssocPokeInfoMove";

export function PokeInfoList(props) {
    const [pokemonInfo, setPokemonInfo] = useState([])
    const [editPokemonInfoModal, setEditPokemonInfoModal] = useState(false)
    const [pokemonInfoIndex, setPokemonInfoIndex] = useState(-1)
    const [assocPokemonInfoModal, setAssocPokemonInfoModal] = useState(false)
    const [deassocPokemonInfoModal, setDeassocPokemonInfoModal] = useState(false)
    const [allPokeInfo, setAllPokeInfo] = useState([])

    let { moveId } = useParams()

    let navigate = useNavigate();

    useEffect(() => {
        getPokemonInfoByMove(moveId)
        .then(pokeInfo => setPokemonInfo(pokeInfo))
    }, [moveId])

    useEffect(() => {
        findAllPokemonInfo()
        .then(pokeInfo => setAllPokeInfo(pokeInfo))
    }, [moveId])

    const handlePokeInfoEdit = async (payload) => {
        await updatePokemonInfo(payload);
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
            Associated Pokemon Species
        </h1>
        <Pages itemsInPageLimit={10} items={pokemonInfo}
        mapFn={(pokeInfo, index) => <ListGroup.Item as="li"
                className="d-flex justify-content-between align-items-start"
                key={index}>
                <div className="ms-2 me-auto">
                    <div className="fw-bold">{pokeInfo.fields.name}</div>
                </div>
                <Button className="me-2" onClick={() => {
                    setPokemonInfoIndex(index)
                    setEditPokemonInfoModal(true)}
                }>Edit</Button>
                <Button className="me-2" onClick={() => {
                    setPokemonInfoIndex(index)
                    setDeassocPokemonInfoModal(true)}
                }>Unteach Pokemon</Button>
            </ListGroup.Item>
        } />
        <EditModal show={editPokemonInfoModal}
                    handleClose={() => setEditPokemonInfoModal(false)}
                    pokemonInfo={allPokeInfo}
                    handleEdit={handlePokeInfoEdit}
                    pokemonInfoIndex={allPokeInfo.findIndex((pokeInfo) => pokeInfo.pk === pokemonInfo[pokemonInfoIndex]?.pk)} />
        <AssocPokeInfoMoveModal show={assocPokemonInfoModal}
                    handleClose={() => setAssocPokemonInfoModal(false)}
                    handleAssoc={handleAssoc}
                    moveId={moveId}
                    pokemonInfo={allPokeInfo} />
        <DeassocPokemonInfoMoveModal show={deassocPokemonInfoModal}
                    handleClose={() => setDeassocPokemonInfoModal(false)}
                    handleDeassoc={handleDeassoc}
                    moveId={moveId}
                    pokemonInfoId={pokemonInfo[pokemonInfoIndex]?.pk} />
        <Button className="me-2" onClick={() => setAssocPokemonInfoModal(true)}>Teach a Pokemon</Button>
        <Button className="me-2" onClick={() => navigate(-1)}>Back</Button>
        </>
    }
    </div>
}

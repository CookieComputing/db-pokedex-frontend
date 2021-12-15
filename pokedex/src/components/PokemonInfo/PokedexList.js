// A component used to render all the pokedexes that know a given pokemon info

import { useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { associatePokemonInfoWithPokedex, deassociatePokemonInfoWithPokedex, updatePokedexById } from "../../api/PokedexAPI";
import { getPokedexesByPokemonInfo } from "../../api/PokemonInfoAPI";
import Pages from "../Page";
import DeassocPokedexPokeInfoModal from "../Trainers/DeassociatePokedexPokemonInfoModal";
import EditPokedexModal from "../Trainers/EditPokedexModal";
import AssocPokemonInfoPokedexModal from "./AssocPokemonInfoPokedex";


export function PokedexList(props) {
    const [pokedexes, setPokedexes] = useState([])
    const [editPokedexModal, setEditPokedexModal] = useState(false)
    const [pokedexIndex, setPokedexIndex] = useState(0)
    const [assocPokedexModal, setAssocPokedexModal] = useState(false)
    const [deassocPokedexModal, setDeassocPokedexModal] = useState(false)

    let { pokemonInfoId } = useParams()

    useEffect(() => {
        getPokedexesByPokemonInfo(pokemonInfoId)
        .then(res => {setPokedexes(res); return res})
    }, [pokemonInfoId])

    const handleEdit = async (id, payload) => {
        await updatePokedexById(id, payload);
        window.location.reload()
    }

    const handleAssoc = async (payload) => {
        await associatePokemonInfoWithPokedex(payload)
        window.location.reload()
    }

    const handleDeassoc = async (payload) => {
        await deassociatePokemonInfoWithPokedex(payload)
        window.location.reload()
    }

    return <div>
    {
        (pokedexes.length === 0) ? null : 
        <>
        <h1>
            Associated pokedexes
        </h1>
        <Pages itemsInPageLimit={10} items={pokedexes}
        mapFn={(pokedex, index) => <ListGroup.Item as="li"
                className="d-flex justify-content-between align-items-start"
                key={index}>
                <div className="ms-2 me-auto">
                    <div className="fw-bold">Pokedex #{pokedex.pk}</div>
                </div>
                <Button className="me-2" onClick={() => {
                    setPokedexIndex(index)
                    setEditPokedexModal(true)}
                }>Edit</Button>
                <Button className="me-2" onClick={() => {
                    setPokedexIndex(index)
                    setDeassocPokedexModal(true)}
                }>Untrack this Pokemon</Button>
            </ListGroup.Item>
        } />
        <EditPokedexModal show={editPokedexModal}
                    handleClose={() => setEditPokedexModal(false)}
                    pokedexes={pokedexes}
                    handleEdit={handleEdit}
                    pokedexIndex={pokedexIndex} />
        <AssocPokemonInfoPokedexModal show={assocPokedexModal}
                    handleClose={() => setAssocPokedexModal(false)}
                    handleAssoc={handleAssoc}
                    pokemonInfoId={pokemonInfoId} />
        <DeassocPokedexPokeInfoModal show={deassocPokedexModal}
                    handleClose={() => setDeassocPokedexModal(false)}
                    handleDeassoc={handleDeassoc}
                    pokedexId={pokedexes[pokedexIndex]?.pk}
                    pokemonInfoId={pokemonInfoId} />
        <Button className="me-2" onClick={() => setAssocPokedexModal(true)}>Add Pokemon to Pokedex</Button>
        </>
    }
    </div>
}
// A component used to render a pokedex's pokemon info

import { useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { associatePokemonInfoWithPokedex, deassociatePokemonInfoWithPokedex, findAllPokemonInfoByPokedexId } from "../../api/PokedexAPI";
import Pages from "../Page";
import {
    useNavigate,
    useParams
  } from "react-router-dom";
import { findAllPokemonInfo, updatePokemonInfo } from "../../api/PokemonInfoAPI";
import EditModal from "../PokemonInfo/EditPokemonInfoModal";
import DeassocPokedexPokeInfoModal from "./DeassociatePokedexPokemonInfoModal";
import AssocPokedexModal from "./AssocPokedexModal";

export function PokedexEntry() {
    const [pokemonInfo, setPokemonInfo] = useState([])
    const [pokemonInfoEditModal, setPokemonInfoEditModal] = useState(false)
    const [pokemonInfoIndex, setPokemonInfoIndex] = useState(-1)
    const [allPokemonInfo, setAllPokemonInfo] = useState([])
    const [deassocModal, setDeassocModal] = useState(false)
    const [deassocPokeInfoId, setDeassocPokeInfoId] = useState(-1)
    const [assocModal, setAssocModal] = useState(false)

    let navigate = useNavigate();
    let { pokedexId } = useParams();

    const handlePokemonInfoEdit = async (id, payload) => {
        await updatePokemonInfo(id, payload)
        window.location.reload()
    }

    const handlePokemonInfoDeassoc = async(payload) => {
        await deassociatePokemonInfoWithPokedex(payload)
        window.location.reload()
    }
    
    const handlePokemonInfoAssoc = async(payload) => {
        await associatePokemonInfoWithPokedex(payload)
        window.location.reload()
    }

    useEffect(() => {
        if (pokedexId !== undefined) {
            findAllPokemonInfoByPokedexId(parseInt(pokedexId, 10))
                .then(pokemonInfo => {setPokemonInfo(pokemonInfo)})
        }
    }, [pokedexId])

    useEffect(() => {
        if (pokedexId !== undefined) {
            findAllPokemonInfo().then(pokemonInfo => {setAllPokemonInfo(pokemonInfo)})
        }
    }, [pokedexId])

    return <div>
        {
            (Object.keys(pokemonInfo).length === 0) ? null : 
            <>
            <h1>
                Known Pokemon for Pokedex {pokedexId}
            </h1>
            <Pages itemsInPageLimit={10} items={pokemonInfo}
            mapFn={(pokemonInfo, index) => <ListGroup.Item as="li"
                    className="d-flex justify-content-between align-items-start"
                    key={index}>
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{pokemonInfo.fields.name}</div>
                    </div>
                    <Button className="me-2" onClick={() => {
                        setPokemonInfoIndex(allPokemonInfo.findIndex((pokeInfo) => pokeInfo.pk === pokemonInfo.pk))
                        setPokemonInfoEditModal(true)}
                    }>Edit</Button>
                    <Button className="danger" onClick={() => {
                        setDeassocPokeInfoId(pokemonInfo.pk)
                        setDeassocModal(true)
                    }}>Remove from Pokedex</Button>
                </ListGroup.Item>
            } />
            </>
        }
        <EditModal show={pokemonInfoEditModal}
                        handleClose={() => {setPokemonInfoEditModal(false)}}
                        pokemonInfo={allPokemonInfo}
                        handleEdit={handlePokemonInfoEdit}
                        pokemonInfoIndex={pokemonInfoIndex}/>
        <AssocPokedexModal show={assocModal}
                        handleClose={() => {setAssocModal(false)}}
                        handleAssoc={handlePokemonInfoAssoc}
                        pokedexId={pokedexId} />
        <DeassocPokedexPokeInfoModal show={deassocModal}
                        handleClose={() => {setDeassocModal(false)}}
                        handleDeassoc={handlePokemonInfoDeassoc}
                        pokedexId={pokedexId}
                        pokemonInfoId={deassocPokeInfoId} />
        <Button className="me-2" onClick={() => setAssocModal(true)}>Add Pokemon to Pokedex</Button>
        <Button className="me-2" onClick={() => navigate(-1)}>Back</Button>
    </div>
}
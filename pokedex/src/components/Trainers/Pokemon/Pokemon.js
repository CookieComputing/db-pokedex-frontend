// Components rendering the individual pokemon within a trainer's team

import { useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { createPokemon, deletePokemon, getPokemonByTeamId, updatePokemon } from "../../../api/PokemonAPI";
import { findAllPokemonInfo } from "../../../api/PokemonInfoAPI";
import { getPokemonTypesByNationalNum } from "../../../api/PokemonTypeAPI";
import Pages from "../../Page";
import PokemonInfoDetailsModal from "../../PokemonInfo/PokemonInfoDetails";
import AddPokemonModal from "./AddPokemonModal";
import DelPokemonModal from "./DelPokemonModal";
import EditPokemonModal from "./EditPokemonModal";

export default function PokemonList(props) {
    const [pokemon, setPokemon] = useState([])
    const [pokemonIndex, setPokemonIndex] = useState(-1)
    const [pokemonDetailsModal, setPokemonDetailsModal] = useState(false)
    const [pokemonInfo, setPokemonInfo] = useState([])
    const [pokemonInfoIndex, setPokemonInfoIndex] = useState(-1)
    const [pokemonAddModal, setPokemonAddModal] = useState(false)
    const [pokemonEditModal, setPokemonEditModal] = useState(false)
    const [pokemonDelModal, setPokemonDelModal] = useState(false)

    let { teamId } = useParams()
    let navigate = useNavigate()

    const handleSave = async (payload) => {
        await createPokemon(payload);
        window.location.reload()
    }

    const handleEdit = async (pokemonId, payload) => {
        await updatePokemon(pokemonId, payload);
        window.location.reload()
    }

    const handleDel = async (payload) => {
        await deletePokemon(payload.pokemonId.toString());
        window.location.reload()
    }

    useEffect(() => {
        if (teamId !== undefined) {
            getPokemonByTeamId(teamId).then(pokemon => {
                setPokemon(pokemon)
            })
        }
    }, [teamId])

    useEffect(() => {
        if (teamId !== undefined) {
            Promise.resolve(findAllPokemonInfo().then(pokeInfo => 
                Promise.all(pokeInfo.map((pi) => 
                    getPokemonTypesByNationalNum(pi.pk).then( types => {   
                            pi['types'] = [];
                            for (const type of types) {
                                pi['types'].push(type.fields.type);
                            }
                            return pi
                        }
                    )
                )).then(newPokeInfo => {
                    setPokemonInfo(newPokeInfo)
                })
            ))
        }
    }, [teamId])

    return <div>
    {
        (pokemon.length === 0) ? null : 
        <>
        <h1>
            Pokemon team members
        </h1>
        <Pages itemsInPageLimit={10} items={pokemon}
        mapFn={(poke, index) => <ListGroup.Item as="li"
                className="d-flex justify-content-between align-items-start"
                key={index}>
                <div className="ms-2 me-auto">
                    <div className="fw-bold">{poke.fields.nickname} ({poke.fields.gender})</div>
                </div>
                <Button className="me-2" onClick={() => {
                    setPokemonInfoIndex(pokemonInfo.findIndex(pokeInfo => pokeInfo.pk === poke.fields.pokemon_info))
                    setPokemonDetailsModal(true)
                }}>Information</Button>
                <Button className="me-2" onClick={() => {
                    setPokemonIndex(index)
                    setPokemonEditModal(true)
                }}>Edit</Button>
                <Button className="danger" onClick={() => {
                    setPokemonIndex(index)
                    setPokemonDelModal(true)
                }}>Delete</Button>
            </ListGroup.Item>
        } />
        </>
    }
    <PokemonInfoDetailsModal show={pokemonDetailsModal}
                        handleClose={() => {setPokemonDetailsModal(false)}}
                        pokemonInfo={pokemonInfo}
                        pokemonInfoIndex={pokemonInfoIndex}
                        navigate={navigate}/>
    <AddPokemonModal show={pokemonAddModal}
                handleClose={() => {setPokemonAddModal(false)}}
                handleSave={handleSave}
                teamId={teamId} />
    <EditPokemonModal show={pokemonEditModal}
                handleClose={() => {setPokemonEditModal(false)}}
                handleEdit={handleEdit}
                pokemon={pokemon}
                pokemonIndex={pokemonIndex} />
    <DelPokemonModal show={pokemonDelModal}
                handleClose={() => {setPokemonDelModal(false)}}
                handleDel={handleDel}
                pokemonId={pokemon[pokemonIndex]?.pk} />
    <Button className="me-2" onClick={() => setPokemonAddModal(true)}>Add a Pokemon</Button>
    <Button className="me-2" onClick={() => navigate(-1)}>Back</Button>
    </div>
}
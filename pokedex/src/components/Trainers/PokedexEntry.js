// A component used to render a pokedex's pokemon info

import { useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { findAllPokemonInfoByPokedexId } from "../../api/PokedexAPI";
import Pages from "../Page";
import {
    useNavigate,
    useParams
  } from "react-router-dom";
import { findAllPokemonInfo, updatePokemonInfo } from "../../api/PokemonInfoAPI";
import EditModal from "../PokemonInfo/EditPokemonInfoModal";

export function PokedexEntry() {
    const [pokemonInfo, setPokemonInfo] = useState([])
    const [pokemonInfoEditModal, setPokemonInfoEditModal] = useState(false)
    const [pokemonInfoIndex, setPokemonInfoIndex] = useState(-1)
    const [allPokemonInfo, setAllPokemonInfo] = useState([])

    let navigate = useNavigate();
    let { pokedexId } = useParams();

    const handlePokemonInfoEdit = async (id, payload) => {
        await updatePokemonInfo(id, payload)
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
                </ListGroup.Item>
            } />
            </>
        }
        <EditModal show={pokemonInfoEditModal}
                        handleClose={() => {setPokemonInfoEditModal(false)}}
                        pokemonInfo={allPokemonInfo}
                        handleEdit={handlePokemonInfoEdit}
                        pokemonInfoIndex={pokemonInfoIndex}/>
        <Button className="me-2" onClick={() => navigate(-1)}>Back</Button>
    </div>
}
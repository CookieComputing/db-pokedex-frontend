// Network API to retrieve pokemon information
import { createResource, deleteResource, getResource, pokedex, pokemon, postResource, teams, trainerPrefix, updateResource } from "./APIUtils";
var urljoin = require('url-join');

export const getAllPokemon = () =>
    getResource(urljoin(trainerPrefix, teams, pokemon));

export const getPokemonByTeamId = (id) =>
    getResource(urljoin(trainerPrefix, teams, pokemon, id.toString()));

export const createPokemon = (body) =>
    postResource(urljoin(trainerPrefix, teams, pokemon, createResource, "/"), body)

export const updatePokemon = (pokemonId, body) => {
    postResource(urljoin(trainerPrefix, teams, pokemon, updateResource, pokemonId.toString(), "/"), body)
}

export const deletePokemon = (pokemonId) => {
    postResource(urljoin(trainerPrefix, teams, pokemon, deleteResource, pokemonId.toString(), "/"), {})
}

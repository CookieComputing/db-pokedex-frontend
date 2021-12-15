// Network API for accessing move data
import { createResource, deleteResource, getResource, postResource, updateResource } from "./APIUtils";
import { trainerPrefix } from "./APIUtils";
var urljoin = require('url-join');

const pokedex = "/pokedex/"
const specificTrainer = "/trainer/"

export const findAllPokedexesById = (trainerId) =>
    getResource(urljoin(trainerPrefix, pokedex, specificTrainer, trainerId.toString()));

export const createPokedex = (body) => 
    postResource(urljoin(trainerPrefix, pokedex, createResource) + "/", body);

export const updatePokedexById = (pokedexId, body) =>
    postResource(urljoin(trainerPrefix, pokedex, updateResource, pokedexId.toString()) + "/", body);

export const deletePokedex = (pokedexId) =>
    postResource(urljoin(trainerPrefix, pokedex, deleteResource, pokedexId.toString()) + "/", {});

export const findAllPokemonInfoByPokedexId = (pokedexId) =>
    getResource(urljoin(trainerPrefix, pokedex, pokedex, pokedexId.toString()))
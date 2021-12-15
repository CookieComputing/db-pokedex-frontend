// Network API for accessing move data
import { associate, createResource, deassociate, deleteResource, getResource, pokedex, postResource, updateResource } from "./APIUtils";
import { trainerPrefix } from "./APIUtils";
var urljoin = require('url-join');

const specificTrainer = "/trainer/"

export const findAllPokedexes = () => getResource(urljoin(trainerPrefix, pokedex))

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

export const associatePokemonInfoWithPokedex = (body) =>
    postResource(urljoin(trainerPrefix, pokedex, associate), body)

export const deassociatePokemonInfoWithPokedex = (body) =>
    postResource(urljoin(trainerPrefix, pokedex, deassociate),  body)
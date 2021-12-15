// Network API to retrieve pokemon information
import { getResource, pokedex, postResource, trainerPrefix } from "./APIUtils";
var urljoin = require('url-join');

const pokemonInfoPrefix = "/pokemon/pokemon_info/";
const pokemonInfo = "/pokemon_info";

export const findAllPokemonInfo = () =>
    getResource(pokemonInfoPrefix);

export const getPokemonInfoById = (id) =>
    getResource(urljoin(pokemonInfoPrefix, id));

export const createPokemonInfo = (pokemonInfo) =>
    postResource(urljoin(pokemonInfoPrefix, "create/"), pokemonInfo)

export const updatePokemonInfo = (pokemonInfo) => {
    postResource(urljoin(pokemonInfoPrefix, "update/", pokemonInfo.national_num.toString(), "/"), pokemonInfo)
}

export const delPokemonInfo = ({ national_num }) => {
    postResource(urljoin(pokemonInfoPrefix, "delete/", national_num.toString(), "/"), {})
}

export const getPokedexesByPokemonInfo = (pokemonInfoId) =>
    getResource(urljoin(trainerPrefix, pokedex, pokemonInfo, pokemonInfoId.toString(), "/"))

// Network API to retrieve pokemon information
import { getResource, postResource } from "./APIUtils";
var urljoin = require('url-join');

const pokemonInfoPrefix = "/pokemon/pokemon_info/";

export const findAllPokemonInfo = () =>
    getResource(pokemonInfoPrefix);

export const getPokemonInfoById = (id) =>
    getResource(urljoin(pokemonInfoPrefix, id));

export const createPokemonInfo = (pokemonInfo) =>
    postResource(urljoin(pokemonInfoPrefix, "create/"), pokemonInfo)

export const updatePokemonInfo = (pokemonInfo) => {
    postResource(urljoin(pokemonInfoPrefix, "update/", pokemonInfo.national_num.toString(), "/"), pokemonInfo)
}

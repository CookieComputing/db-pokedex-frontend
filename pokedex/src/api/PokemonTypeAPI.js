// Network API to interact with a pokemon's types
import { getResource, postResource } from "./APIUtils";
var urljoin = require('url-join');

const pokemonInfoTypePrefix = "/pokemon/pokemon_type/";

export const findAllPokemonTypes = () =>
    getResource(pokemonInfoTypePrefix);

export const getPokemonTypesByNationalNum = (nationalNum) =>
    getResource(urljoin(pokemonInfoTypePrefix, nationalNum.toString()));

export const getPokemonTypeAssoc = (nationalNum, type) =>
    getResource(urljoin(pokemonInfoTypePrefix, nationalNum.toString(), type));

export const createPokemonType = (typeAssoc) =>
    postResource(urljoin(pokemonInfoTypePrefix, "create/"), typeAssoc);

export const updatePokemonType = (nationalNum, type) => {
    postResource(urljoin(pokemonInfoTypePrefix, "update/", nationalNum.toString(), type, "/"), {});
}

export const deletePokemonType = (nationalNum, type) => {
    postResource(urljoin(pokemonInfoTypePrefix, "delete/", nationalNum.toString(), type, "/"));
}

export const applyPokemonType = (nationalNum, types) => {
    postResource(urljoin(pokemonInfoTypePrefix, "apply/", nationalNum.toString(), "/"), {types: types})
}
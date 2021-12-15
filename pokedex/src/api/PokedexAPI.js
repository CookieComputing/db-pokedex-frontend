// Network API for accessing move data
import { getResource, postResource } from "./APIUtils";
import { trainerPrefix } from "./APIUtils";
var urljoin = require('url-join');

const pokedex = "/pokedex/"
const specificTrainer = "/trainer/"

export const findAllPokedexesById = (trainerId) =>
    getResource(urljoin(trainerPrefix, pokedex, specificTrainer, trainerId.toString()));
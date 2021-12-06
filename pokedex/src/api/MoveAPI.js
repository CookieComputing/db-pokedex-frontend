// Network API for accessing move data
import { getResource, postResource } from "./APIUtils";
var urljoin = require('url-join');


const movePrefix = "/pokemon/moves/";
const createResource = "/create/";
const updateResource = "/update/";
const deleteResource = "/delete/";

export const findAllMoves = () =>
    getResource(movePrefix);

export const findMoveById = (id) =>
    getResource(urljoin(movePrefix, id));

export const createMove = (moveData) =>
    postResource(urljoin(movePrefix, createResource) + "/", moveData);

export const updateMove = (id, newMoveData) =>{

    console.log(urljoin(movePrefix, updateResource, id));
    return postResource(urljoin(movePrefix, updateResource, id) + "/", newMoveData);
}

export const deleteMove = (id) =>
    postResource(urljoin(movePrefix, deleteResource, id) + "/", {});
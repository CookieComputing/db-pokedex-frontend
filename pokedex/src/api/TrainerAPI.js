// Network API for accessing move data
import { getResource, postResource } from "./APIUtils";
var urljoin = require('url-join');


const trainerPrefix = "/trainers/";
const createResource = "/create/";
const updateResource = "/update/";
const deleteResource = "/delete/";

export const findAllTrainers = () =>
    getResource(trainerPrefix);

export const findTrainerById = (id) =>
    getResource(urljoin(trainerPrefix, id));

export const createTrainer = (trainerData) =>
    postResource(urljoin(trainerPrefix, createResource) + "/", trainerData);

export const updateTrainer = (id, newTrainerData) =>{
    return postResource(urljoin(trainerPrefix, updateResource, id) + "/", newTrainerData);
}

export const deleteTrainer = (id) =>
    postResource(urljoin(trainerPrefix, deleteResource, id) + "/", {});
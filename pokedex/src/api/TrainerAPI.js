// Network API for accessing move data
import { getResource, postResource } from "./APIUtils";
import { trainerPrefix, createResource, updateResource, deleteResource } from "./APIUtils";
var urljoin = require('url-join');

export const findAllTrainers = () =>
    getResource(trainerPrefix);

export const findTrainerById = (id) =>
    getResource(urljoin(trainerPrefix, id));

export const createTrainer = (trainerData) =>
    postResource(urljoin(trainerPrefix, createResource) + "/", trainerData);

export const updateTrainer = (newTrainerData) => {
    return postResource(urljoin(trainerPrefix, updateResource, newTrainerData.pk.toString()) + "/", newTrainerData);
}

export const deleteTrainer = ({ pk }) =>
    postResource(urljoin(trainerPrefix, deleteResource, pk.toString()) + "/", {});
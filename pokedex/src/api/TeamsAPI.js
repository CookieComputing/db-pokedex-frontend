// Network API for accessing move data
import { createResource, deleteResource, getResource, postResource, updateResource } from "./APIUtils";
import { trainerPrefix } from "./APIUtils";
var urljoin = require('url-join');

const teams = "/teams/"

export const findAllTeamsByTrainerId = (trainerId) =>
    getResource(urljoin(trainerPrefix, teams, trainerId.toString()));

export const createTeam = (body) => 
    postResource(urljoin(trainerPrefix, teams, createResource) + "/", body);

export const updateTeamById = (teamId, body) =>
    postResource(urljoin(trainerPrefix, teams, updateResource, teamId.toString()) + "/", body);

export const deleteTeam = (teamId) =>
    postResource(urljoin(trainerPrefix, teams, deleteResource, teamId.toString()) + "/", {});
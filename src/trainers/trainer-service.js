// declare URL where server listens for HTTP requests
const TRAINERS_URL = "http://localhost:8080/api/trainers"

// retrieve all users from the server
export const findAllTrainers = () =>
    fetch(TRAINERS_URL)
    .then(response => response.json())


// retrieve a single Trainerby their ID
export const findTrainerById = (id) =>
    fetch(`${TRAINERS_URL}/${id}`)
    .then(response => response.json())


// delete a Trainerby their ID
export const deleteTrainer = (id) =>
    fetch(`${TRAINERS_URL}/${id}`, {
      method: "DELETE"
    })


// create a new user
export const createTrainer= (user) =>
    fetch(TRAINERS_URL, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {'content-type': 'application/json'}
    })
    .then(response => response.json())


// update a Trainerby their ID
export const updateTrainer= (id, user) =>
    fetch(`${TRAINERS_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {'content-type': 'application/json'}
    })
    .then(response => response.json())


// TODO: export all functions as the API to this service
export default {
    findAllTrainers,
    findTrainerById,
    deleteTrainer,
    createTrainer,
    updateTrainer
}

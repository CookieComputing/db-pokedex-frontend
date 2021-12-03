// declare URL where server listens for HTTP requests
const TRAINERS_URL = "http://localhost:8000/trainers"

// retrieve all users from the server
export const findAllTrainers = () =>
    fetch(TRAINERS_URL)
    .then(response => console.log(response.json()))


// retrieve a single Trainer by their ID
export const findTrainerById = (id) =>
    fetch(`${TRAINERS_URL}/${id}/`)
    .then(response => response.json())


// delete a Trainer by their ID
export const deleteTrainer = (id) =>
    fetch(`${TRAINERS_URL}/delete/${id}/`, {
        method: 'POST',
        body: JSON.stringify(id),
        headers: {'content-type': 'application/json'}
    })


// create a new user
export const createTrainer= (user) =>
    fetch(TRAINERS_URL, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {'content-type': 'application/json'}
    })
    .then(response => response.json())


// update a Trainer by their ID
export const updateTrainer= (id, user) =>
    fetch(`${TRAINERS_URL}/update/${id}/`, {
        method: 'POST',
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

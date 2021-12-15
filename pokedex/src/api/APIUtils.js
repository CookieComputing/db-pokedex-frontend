// Common functionality amongst network calls to the backend
var urljoin = require('url-join');

const host = "http://localhost:8000";

export const trainerPrefix = "/trainers/";
export const pokedex = "/pokedex/"
export const createResource = "/create/";
export const updateResource = "/update/";
export const deleteResource = "/delete/";
export const associate = "/associate/";
export const deassociate = "/deassociate/";

// httpEndpoint is the suffix after the host, e.g. the "/var/end/" suffix in "http://google.com/var/end/"
export const getResource = (httpEndpoint) => 
    fetch(urljoin(host, httpEndpoint), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    }).then(response => response.json());

// httpEndpoint is the suffix after the host, e.g. the "/var/end/" suffix in "http://google.com/var/end/"
// body is a JSON object describing the desired changes for a resource
export const postResource = (httpEndpoint, body) => 
    fetch(urljoin(host, httpEndpoint), {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        mode: 'cors'
    }).then(response => response.json());
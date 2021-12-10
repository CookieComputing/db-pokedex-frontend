import ReactMarkdown from 'react-markdown'


const descriptionMarkdown = `
# CS 3200: Pokedex Final App

![A picture of a pokedex](pokedex.png)

*Authors: Natalie Hsu, Kevin Hui, Amy Ying*

## Mission
We created this project to help Trainers keep track of their teams
and record the pokemon they seen in the wild! Trainers have the 
ability to add, edit, and remove pokemon from their teams, as well as
the ability to record pokemon they've seen in the wild based on the various
regions they've been to.

The Pokedex is inspired by the [Pokedex](https://pokemon.fandom.com/wiki/Pok%C3%A9dex) from
the popular video game, [Pokemon](https://www.pokemon.com/us/). Trainers can capture pokemon
(short for Pocket Monster) and use them in battles against other Trainers.

## Features

CRUD operations for trainers, pokemon that trainers own, information about pokemon, and the moves
pokemon know.

A responsive front end to interact with the pokemon stored in the database.

### Source Code
All source code can be found in our two repositories, which host the front end and back end code that
supports the pokedex.

Frontend code: [Link](https://github.com/CookieComputing/db-pokedex-frontend)

Backend code: [Link](https://github.com/CookieComputing/db-pokedex-backend)

## Pokedex Design Diagram
![UML design diagram](uml_design.png)
`

export default function Home() {
    return <div>
        <ReactMarkdown>
            {descriptionMarkdown}
        </ReactMarkdown>
        </div>
}
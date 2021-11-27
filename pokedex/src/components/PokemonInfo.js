// Components for handling Pokemon info

import React from 'react';
import { findAllPokemonInfo } from '../api/PokemonInfoAPI';
import Tab from 'react-bootstrap/Tab';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row'
import Badge from 'react-bootstrap/Badge'
const {useState, useEffect} = React;

// The main tab for rendering pokemon information
export function PokemonInfoTab (props) {
    return <Tab eventKey="pokemonInfo" title="Pokemon Information">
        <Container>
            <Row>
                <Col><PokemonInfoList></PokemonInfoList></Col>
                <Col>foo</Col>
            </Row>
        </Container>
    </Tab>
}

function PokemonInfoList (props) {
    const [pokemonInfo, setPokemonInfo] = useState([])
    useEffect(() => {
        findAllPokemonInfo().then(pokeInfo => {setPokemonInfo(pokeInfo)})
    }, [])
    return <div>
        <h2>Pokemon Info</h2>
        <ListGroup as='ol' numbered>
            {
                pokemonInfo.map(pokeInfo =>
                    <ListGroup.Item as="li" 
                    className="d-flex justify-content-between align-items-start" 
                    key={pokeInfo.pk}> 
                        <div className="ms-2 me-auto">
                        <div className="fw-bold">{pokeInfo.fields.name}</div>
                        </div>
                        <Badge variant="primary" pill>
                            {pokeInfo.pk}
                        </Badge>
                    </ListGroup.Item>
                    )
            }
        </ListGroup>
    </div>
}

function PokemonInfoDetails (props) {
    return <Container>
        <Row>
            <Col></Col>
            <Col></Col>
        </Row>
    </Container>
}
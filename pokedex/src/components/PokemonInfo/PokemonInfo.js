// Components for handling Pokemon info

import React from 'react';
import { createPokemonInfo, findAllPokemonInfo, updatePokemonInfo, delPokemonInfo } from '../../api/PokemonInfoAPI';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button';
import AddPokemonInfoModal from "./AddPokemonInfoModal";
import EditPokemonInfoModal from "./EditPokemonInfoModal";
import DelPokemonInfoModal from "./DelPokemonInfoModal";
import Pages from "../Page";
import { ListGroup } from 'react-bootstrap';
import PokemonInfoDetailsModal from './PokemonInfoDetails';

// The main tab for rendering pokemon information
export function PokemonInfoTab(props) {
    return <div>
        <Container>
            <Row>
                <Col><PokemonInfoList></PokemonInfoList></Col>
            </Row>
        </Container>
    </div>
}

class PokemonInfoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemonInfo: [],
            pokemonInfoIndex: -1,
            addModalVisible: false,
            editModalVisible: false,
            delModalVisible: false,
            detailModalVisible: false
        }
    }

    async handleSave(payload) {
        createPokemonInfo(payload);
        window.location.reload();
    }

    async handleEdit(payload) {
        updatePokemonInfo(payload);
        window.location.reload();
    }

    async handleDel(payload) {
        delPokemonInfo(payload);
        window.location.reload();
    }

    componentDidMount() {
        findAllPokemonInfo().then(pokeInfo => {
            this.setState({pokemonInfo: pokeInfo})})
    }

    findIndex(pk) {
        // Inefficient but whatever ¯\_(ツ)_/¯
        return this.state.pokemonInfo.findIndex((pokeInfo) => pokeInfo.pk === pk)
    }

    render() {
        return <div>
        <h1>Pokemon Info</h1>
        <Pages itemsInPageLimit={10} items={this.state.pokemonInfo} 
        mapFn={(pokeInfo) =>
                { return (<ListGroup.Item as="li"
                        className="d-flex justify-content-between align-items-start"
                        key={pokeInfo.pk}>
                            <div className="ms-2 me-auto">
                            <div className="fw-bold">{pokeInfo.fields.name}</div>
                        </div>
                        <Badge variant="dark" className="btn-primary me-2 align-self-center" pill>
                            {pokeInfo.pk}
                        </Badge>
                        <Button className="me-2" onClick={() => {
                            this.setState({
                                pokemonInfoIndex: pokeInfo.pk,
                                detailModalVisible: true
                            })
                        }}>Details</Button>
                        <Button className="me-2" onClick={() => {
                            this.setState({
                                pokemonInfoIndex: pokeInfo.pk,
                                editModalVisible: true
                            })
                        }}>Edit</Button>
                        <Button variant="danger" onClick={() => {
                            this.setState({
                                pokemonInfoIndex: pokeInfo.pk,
                                delModalVisible: true
                            })}}>Delete</Button>
                    </ListGroup.Item>)
                }}/>
        <br />
        <Button onClick={() => this.setState({addModalVisible: true})}>Add</Button>
        <AddPokemonInfoModal
            show={this.state.addModalVisible}
            handleClose={() => this.setState({addModalVisible: false})}
            pokemonInfo={this.state.pokemonInfo}
            handleSave={(payload) => this.handleSave(payload)} />
        <EditPokemonInfoModal
            show={this.state.editModalVisible}
            handleClose={() => this.setState({editModalVisible: false})}
            pokemonInfo={this.state.pokemonInfo}
            handleEdit={(payload) => this.handleEdit(payload)}
            pokemonInfoIndex={this.findIndex(this.state.pokemonInfoIndex)} />
        <DelPokemonInfoModal
            show={this.state.delModalVisible}
            handleClose={() => this.setState({delModalVisible: false})}
            handleDel={(payload) => this.handleDel(payload)}
            national_num={this.state.pokemonInfo[this.findIndex(this.state.pokemonInfoIndex)]?.pk} />
        <PokemonInfoDetailsModal
            show={this.state.detailModalVisible}
            handleClose={() => this.setState({detailModalVisible: false})}
            pokemonInfo={this.state.pokemonInfo}
            pokemonInfoIndex={this.findIndex(this.state.pokemonInfoIndex)} />
    </div>
    }
}
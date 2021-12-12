import React from 'react';
import { createTrainer, findAllTrainers, updateTrainer, deleteTrainer } from '../../api/TrainerAPI';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button';
import AddTrainersModal from "./AddTrainersModal";
import EditTrainersModal from "./EditTrainersModal";
import DelTrainersModal from "./DelTrainersModal";
import Pages from '../Page';

export default function Trainers(props) {
    return <div>
        <Container>
            <Row>
                <Col><PokemonTrainersList></PokemonTrainersList></Col>
            </Row>
        </Container>
    </div>
}

class PokemonTrainersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemonTrainer: [],
            pokemonTrainerIndex: 0,
            addModalVisible: false,
            editModalVisible: false,
            delModalVisible: false
        }
    }

    async handleSave(payload) {
        createTrainer(payload);
        window.location.reload();
    }

    async handleEdit(payload) {
        updateTrainer(payload);
        window.location.reload();
    }

    async handleDel(payload) {
        deleteTrainer(payload);
        window.location.reload();
    }

    componentWillMount() {
        findAllTrainers().then(pokeTrainers => this.setState({pokemonTrainer: pokeTrainers}))
    }

    findIndex(pk) {
        return this.state.pokemonTrainer.findIndex((trainer) => trainer.pk === pk)
    }

    render() {
        return <div>
            <h1>Trainers</h1>
            <Pages itemsInPageLimit={10} items={this.state.pokemonTrainer}
            mapFn={(pokeTrainer) => <ListGroup.Item as="li"
                    className="d-flex justify-content-between align-items-start"
                    key={pokeTrainer.pk}>
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{pokeTrainer.fields.first_name} {pokeTrainer.fields.last_name}</div>
                    </div>
                    <Badge variant="dark" className="btn-primary me-2 align-self-center" pill>
                        {pokeTrainer.pk}
                    </Badge>
                    <Button className="me-2" onClick={() => {
                        this.setState({
                            pokemonTrainerIndex: pokeTrainer.pk,
                            editModalVisible: true
                        })
                    }}>Edit</Button>
                    <Button variant="danger" onClick={() => {
                        this.setState({
                            pokemonTrainerIndex: pokeTrainer.pk,
                            delModalVisible: true
                        })
                    }}>Delete</Button>
                </ListGroup.Item>
            } />
        <br />
        <Button onClick={() => this.setState({addModalVisible: true})}>Add</Button>
        <AddTrainersModal
            show={this.state.addModalVisible}
            handleClose={() => this.setState({addModalVisible: false})}
            handleSave={this.handleSave} />
        <EditTrainersModal
            show={this.state.editModalVisible}
            handleClose={() => this.setState({editModalVisible: false})}
            pokemonTrainer={this.state.pokemonTrainer}
            handleEdit={this.handleEdit}
            pokemonTrainerIndex={this.findIndex(this.state.pokemonTrainerIndex)} />
        <DelTrainersModal
            show={this.state.delModalVisible}
            handleClose={() => this.setState({delModalVisible: false})}
            handleDel={this.handleDel}
            primary_key={this.state.pokemonTrainer[this.findIndex(this.state.pokemonTrainerIndex)]?.pk} />
        </div>
    }
}
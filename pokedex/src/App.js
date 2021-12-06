import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import logo from './pokeball.png'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home';
import { PokemonInfoTab } from './components/PokemonInfo/PokemonInfo';
import Trainers from './components/Trainers';
import Moves from './components/Moves/Moves';


function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <Navbar.Brand href="#home">
                <img
                  alt=""
                  src={logo}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                />{' '}
                NEU Pokedex
              </Navbar.Brand>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Link to="/" component={Nav.Link}>Home</Link>
                  <Link to="/pokemonInfo" component={Nav.Link}>Pokemon Info</Link>
                  <Link to="/trainers" component={Nav.Link}>Trainers</Link>
                  <Link to="/moves" component={Nav.Link}>Pokemon Moves</Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/pokemonInfo" exact>
              <PokemonInfoTab />
            </Route>
            <Route path="/trainers" exact>
              <Trainers />
            </Route>
            <Route path="/moves" exact>
              <Moves />
            </Route>
          </Switch>
        </div>
      </Router>

    </div>
  );
}

export default App;

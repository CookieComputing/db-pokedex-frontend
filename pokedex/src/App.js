import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import logo from './pokeball.png'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home';
import { PokemonInfoTab } from './components/PokemonInfo/PokemonInfo';
import Trainers from './components/Trainers/Trainers';
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
                  <Nav.Item>
                    <Nav.Link href="/">Home</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/pokemonInfo">Pokemon Info</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/trainers">Trainers</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/moves">Moves</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/pokemonInfo/*" element={<PokemonInfoTab />} />
            <Route path="/trainers/*" element={<Trainers />} />
            <Route path="/moves/*" element={<Moves />}>
            </Route>
          </Routes>
        </div>
      </Router>

    </div>
  );
}

export default App;

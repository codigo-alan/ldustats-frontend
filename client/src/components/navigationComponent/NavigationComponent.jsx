import { Link, NavLink } from "react-router-dom";
import './navigationComponent.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export function NavigationComponent() {

    return (
        <Navbar bg="primary" expand="lg">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="col-12 d-flex justify-content-between">
                        <NavLink className="navLink" to="/players">Jugadores</NavLink>
                        <NavLink className="navLink" to="player-add">Agregar jugador</NavLink>
                        <NavDropdown className="dropdownLink" title="Mi perfil" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">User Name</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Cerrar sesión
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

    /* <nav className="navbar navbar-expand-sm navBar">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="navLink" to='/players'>Jugadores</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="navLink" to='player-add'>Agregar jugador</Link>
                    </li>
                    
                    
                    <li className="nav-item dropdown">
                        <Link  id="navbarDropdown" role="button" data-bs-toggle="dropdown" className="navLink dropdown-toggle" to='player-add'>Mi perfil</Link>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav> */

    
}
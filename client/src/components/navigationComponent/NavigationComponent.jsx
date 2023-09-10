import { Link, NavLink } from "react-router-dom";
import './navigationComponent.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useLocation } from 'react-router-dom';

export function NavigationComponent() {

    let userName = localStorage.getItem("username") ?? "Not logged";

    //use to know which is the current location
    const location = useLocation();
    console.log(location.pathname);

    //if location is /login not render any, in other way shows the NavBar contain
    return (

        <>
        {(location.pathname != '/login') ? <Navbar bg="primary" expand="lg">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="col-12 d-flex justify-content-between">
                        <NavLink className="navLink" to="/players">Jugadores</NavLink>
                        <NavLink className="navLink" to="/files">Ficheros</NavLink>
                        <NavLink className="navLink" to="/sessions">Sesiones</NavLink>
                        <NavLink className="navLink" to="player-add">Agregar jugador</NavLink>
                        <NavDropdown className="dropdownLink" title={userName} id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Mi perfil</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/login">
                                Cerrar sesión
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar> : <></>}
        </>
        
    )

    
}
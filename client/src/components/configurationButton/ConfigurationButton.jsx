import { useEffect, useState } from "react"
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Offcanvas } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

export function ConfigurationButton() {
    const headers = ['drill', 'name']; //debug
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return (
        <div>
            <button className="btn btn-secondary" onClick={handleShow}>
                <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>
            </button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Configuración de tablas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div>
                        <h5>Sesiones</h5>
                        <Form.Select>
                            {headers.map((e) => {
                                return(<option value="3">{e}</option>);
                            })}
                        </Form.Select>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>

        </div>
    );
}
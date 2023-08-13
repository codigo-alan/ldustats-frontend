import { useEffect, useState } from "react"
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Offcanvas } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { allSessionHeaders } from "../../models/Organisation";

export function ConfigurationButton({outputHeaders}) {
    const [show, setShow] = useState(false);
    const [headers, setHeaders] = useState(allSessionHeaders);
    const [selectedHeaders, setSelectedHeaders] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleSelectChange = (event) => {
        const selected = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedHeaders(selected);
        outputHeaders(selected);
      };
    
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
                        <Form.Select multiple onChange={handleSelectChange}>
                            {headers.map((e) => {
                                return(
                                    <option key={e.title} value={e.title}>{e.title} </option>
                                );
                            })}
                        </Form.Select>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>

        </div>
    );
}
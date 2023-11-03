import { useEffect, useState } from "react";
import { Container, Form, Col } from "react-bootstrap";

export function SearchBarComponent({onSearch, type='players', width=4}) {
    const [placeholder, setPlaceHolder] = useState([]);
    const [query, setQuery] = useState('');

    const handleInputChange = (event) => {
        setQuery(event.target.value);
        onSearch(event.target.value);
    };

    //type changes
    useEffect(() => {
        if ((type == 'players') || (type == 'sessions')) {
            setPlaceHolder('Buscar por nombre')
        }
        if (type == 'files') {
            setPlaceHolder('Buscar por fecha')
        }

    }, [type]);

    return (
        <Container className="ps-0">
            <Col sm={width}>
                <Form>
                    <Form.Control
                        type="search"
                        placeholder={placeholder}
                        aria-label="Search"
                        onChange={handleInputChange}
                        value={query}
                    />
                </Form>
            </Col>
        </Container>
    );
}
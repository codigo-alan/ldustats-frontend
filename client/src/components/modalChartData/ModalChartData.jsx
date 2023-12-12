import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ChartComponent } from "../chartComponent/ChartComponent";
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';

export function ModalChartData({show, handleClose, initialData, itemsByCol = []}) {
  
    const [itemsToShow, setItemsToSHow] = useState([]);

    useEffect( () => {
        if (itemsByCol.length > 0) {
            console.log(itemsByCol.map( (item) => ({time: item.date, value: item.columnValue})))
        }

    }, [itemsByCol]);



  return (
      <Modal show={show} onHide={handleClose} size='lg'>
          <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              {initialData && (
                <>
                    <div className="col-4">
                        <Form.Select size='sm' aria-label="Default select example">
                        <option>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                        </Form.Select>
                    </div>
                    <ChartComponent data={initialData}></ChartComponent>
                </>)}
              
          </Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                  Close
              </Button>
              {/* <Button variant="primary" onClick={handleClose}>
                  Save Changes
              </Button> */}
          </Modal.Footer>
      </Modal>
  );
};

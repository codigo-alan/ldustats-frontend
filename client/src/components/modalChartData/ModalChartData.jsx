import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ChartComponent } from "../chartComponent/ChartComponent";
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';

export function ModalChartData({show, handleClose, itemsByCol = [], title = '', drillTitles = []}) {
  
    const [itemsToShow, setItemsToSHow] = useState([]);
    const [currentValue, setCurrentValue] = useState('Sprint U19');

    const handleChange = (event) => {
        setCurrentValue(event.target.value);
    }

    //change of selected option or show state modal
    useEffect( () => {
        if (currentValue && (show === true)) {
            setItemsToSHow(itemsByCol
                .filter( (item) => item.drill == currentValue )
                .map( (itemFiltered) => ({time: itemFiltered.date, value: itemFiltered.columnValue})));
        }

    }, [currentValue, show]);



  return (
      <Modal show={show} onHide={handleClose} size='lg'>
          <Modal.Header closeButton>
              <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              {itemsByCol && (
                  <>
                      <div className="col-4 pb-2">
                          <Form.Select size='sm' value={currentValue} onChange={handleChange}>
                              {drillTitles.map((option, index) => (
                                  <option key={index} value={option}>
                                      {option}
                                  </option>
                              ))}
                          </Form.Select>
                      </div>
                      <ChartComponent data={itemsToShow}></ChartComponent>
                  </>)}

          </Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                  Close
              </Button>
          </Modal.Footer>
      </Modal>
  );
};

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ChartComponent } from "../chartComponent/ChartComponent";

export function ModalChartData({show, handleClose, initialData}) {
  

  return (
      <Modal show={show} onHide={handleClose} size='lg'>
          <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <ChartComponent data={initialData}></ChartComponent>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                  Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                  Save Changes
              </Button>
          </Modal.Footer>
      </Modal>
  );
};

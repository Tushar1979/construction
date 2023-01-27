
import React from "react";
import { Modal, Button } from "react-bootstrap";


const CustomizeModal = (props) => {
  const { show, handleClose, size, modalTitle, onClick } = props;
  return (
    <Modal onClose={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>

      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handleClose()}>close</Button>
        <Button onClick={onClick}>{props.Action}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomizeModal;


{/* <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.Modalheading}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <h4>{props.modalhead}</h4> */}
// <p>
{/* {props.modalbody} */ }
{/* </p>
      </Modal.Body>
      
    </Modal>  */}
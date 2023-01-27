
import React from "react";
import { Modal, Button } from "react-bootstrap";


const EditableModal = (props) => {
  const { show, handleClose, size, modalTitle, onClick } = props;
  return (
    <Modal onClose={handleClose} size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>

      </Modal.Header>
      <Modal.Body>
        {props.children}</Modal.Body>
      {/* <Modal.Footer>
      <Button onClick={() => handleClose()}>close</Button>
      <Button onClick={onClick} type={props.type}  value={props.value}>{props.Action}</Button>
       </Modal.Footer> */}
    </Modal>
  );
};

export default EditableModal;
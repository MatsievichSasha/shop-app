import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function ModalDelete() {

  return (
    <>
      <Modal /* show={show} onHide={handleClose} */>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>Вы уверены? Удалить карточку?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" /* onClick={handleClose} */>
            Закрыть
          </Button>
          <Button variant="primary" /* onClick={handleClose} */>
            Удалить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
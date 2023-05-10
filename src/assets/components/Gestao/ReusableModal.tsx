import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IconType } from 'react-icons';

interface ReusableModalProps {
  title: string;
  body: string;
  buttonText: string;
  onSave: () => void;
  icon: IconType;
}

const ReusableModal: React.FC<ReusableModalProps> = ({ title, body, buttonText, onSave, icon: Icon }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className='defaultButtonPageAdmin controlDark' onClick={handleShow}>
        {buttonText}<Icon />
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ReusableModal;

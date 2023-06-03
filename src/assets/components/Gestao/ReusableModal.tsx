import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IconType } from 'react-icons';
import { useInterceptResponseFormContext  } from '../../../assets/components/Gestao/interceptResponseForm';
import { ThemeContext } from '../NavBar/controls/controlTheme/SwitchContext';


interface ReusableModalProps {
  title: string;
  buttonText: string;
  onSave: () => void;
  icon: IconType;
  children: React.ReactNode;
  id: string;
  
}


const ReusableModal: React.FC<ReusableModalProps> = ({ id, title, children, buttonText, onSave, icon: Icon }) => {
  const { confirm, interceptResponseForm } = useInterceptResponseFormContext();
  const { isTheme } = useContext(ThemeContext);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (confirm) {
      interceptResponseForm(400);
      handleClose();
    }
  }, [confirm]);

  return (
    <>
      <button className={`defaultButtonPageAdmin ${isTheme ? 'controlDark' : 'controlWhite'}`} onClick={handleShow}>
        {buttonText}<Icon />
      </button>

      <Modal show={show} onHide={handleClose} id={id}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={onSave}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ReusableModal;

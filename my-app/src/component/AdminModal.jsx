import React from "react";
import Modal from "react-modal";
import ProductSidebar from '../component/ProductSidebar'

Modal.setAppElement("#root");

export default function AdminModal({
  isOpen = false,
  onClose = () => {},
  title = "",
  action = "",
}) {
  const customStyles = {
     content: {
      position: 'fixed', 
      top: '0',
      right: '0',
      bottom: '0',
      left: 'auto', 
      width: '100%',
      maxWidth: '500px', 
      padding: '0',
      border: 'none',
      background: 'white',
      overflow: 'hidden', 
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '0',
      boxShadow: '-2px 0 15px rgba(0, 0, 0, 0.3)',
      outline: 'none', 
    },
    overlay: {
      position: 'fixed', 
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
      zIndex: 1000,
    },
  };

  return (
     <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel={`${title} Product Modal`}
      overlayClassName={{
        base: "ReactModal__Overlay", 
        afterOpen: "animate-fade-in", 
        beforeClose: "animate-fade-out" 
      }}
      className={{
        base: "ReactModal__Content", 
        afterOpen: "animate-slide-in-right", 
        beforeClose: "animate-slide-out-right" 
      }}
      closeTimeoutMS={300} 
    >
      <ProductSidebar 
      OnClose={onClose}
       title={title} 
       action={action} />
    </Modal>
  );
}

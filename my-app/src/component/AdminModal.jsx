import React from "react";
import Modal from "react-modal";
import { X } from "lucide-react";

Modal.setAppElement("#root");

export default function AdminModal({
  isOpen = false,
  onClose = () => {},
  title = "",
  action = "",
  children = null,
  shouldCloseOnEsc = true,
  shouldCloseOnOverlayClick = true,
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
      boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.15)',
      outline: 'none',
      animation: isOpen ? 'slideInRight 0.3s ease-out' : 'slideOutRight 0.3s ease-in',
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: isOpen ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)',
      zIndex: 1000,
      transition: 'background-color 0.3s ease',
    },
  };

  return (
    <>
      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #e5e7eb;
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
        }

        .modal-header h2 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
        }

        .modal-close-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          transition: all 0.2s ease;
          color: #6b7280;
        }

        .modal-close-btn:hover {
          background-color: #f3f4f6;
          color: #1f2937;
        }

        .modal-close-btn:active {
          transform: scale(0.95);
        }

        .modal-content {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
        }

        .modal-content::-webkit-scrollbar {
          width: 6px;
        }

        .modal-content::-webkit-scrollbar-track {
          background: #f1f5f9;
        }

        .modal-content::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }

        .modal-content::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>

      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={customStyles}
        contentLabel={`${title} Modal`}
        shouldCloseOnEsc={shouldCloseOnEsc}
        shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
        closeTimeoutMS={300}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <h2>{title}</h2>
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="modal-content">
          {children}
        </div>
      </Modal>
    </>
  );
}
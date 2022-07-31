import React from "react";
import "./Modal.css";
import CloseIcon from "../../assets/icons/close.svg";

function Modal({ heading, isOpen, setOpen, children }) {
  return (
    <div className="modal-div">
      <div className="modal-header">
        <h6>{heading}</h6>
        <button className="close-btn" onClick={() => setOpen(!isOpen)}>
          <img  src={CloseIcon} alt="close" />
        </button>
      </div>
      <div className="modal-body">
        {children}
      </div>
    </div>
  );
}

export default Modal;

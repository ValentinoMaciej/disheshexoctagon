import React from "react";
import styles from "./Modal.module.css";

const Modal = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Success !</h2>
        <button className={styles.modalCloseButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;

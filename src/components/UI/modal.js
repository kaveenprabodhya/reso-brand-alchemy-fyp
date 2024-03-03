import classes from "./modal.module.css";
const Modal = ({ isOpen, title, children, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className={classes.modalDialog}
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "20px",
        maxWidth: "600px",
        width: "90%",
        zIndex: 1050,
      }}
    >
      <div className="d-flex" style={{ marginBottom: "15px" }}>
        <h2>{title}</h2>
        <button
          className="ms-auto btn btn-sm btn-danger h-25 align-self-center"
          onClick={onClose}
        >
          X
        </button>
      </div>
      {children}
    </div>
  );
};

export default Modal;

import classes from "./modal.module.css";
const Modal = ({ isOpen, title, children, onClose, padding = "10px 20px" }) => {
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
        maxWidth: "600px",
        width: "90%",
        zIndex: 1050,
        borderRadius: "10px"
      }}
    >
      <div className="d-flex" style={{ padding: "10px 20px" }}>
        <h2>{title}</h2>
        <button
          className="ms-auto btn btn-sm btn-danger h-25 align-self-center"
          onClick={onClose}
        >
          X
        </button>
      </div>
      <div className={classes.horizontalSeparator}></div>
      <div style={{padding: padding}}>{children}</div>
    </div>
  );
};

export default Modal;

import classes from "./history.module.css";

const HistoryTab = () => {
  return (
    <>
      <div
        style={{
          backgroundColor: "#F2F4F4",
          width: "220px",
          overflowY: "scroll",
        }}
      >
        <div
          className="rounded-3 mx-2 mt-2 d-flex align-items-center justify-content-between px-2"
          style={{
            height: "38px",
            backgroundColor: "#ffffff",
          }}
        >
          <div className="text-dark fw-bold">Image Name</div>
          <div className={classes.circle}>
            <div>
              <div className={classes.dot}></div>
              <div className={classes.dot}></div>
              <div className={classes.dot}></div>
            </div>
          </div>
        </div>
      </div>
      <div className="col d-flex flex-column justify-content-center align-items-center">
        <div
          className="border border-3"
          style={{ width: "580px", height: "540px" }}
        ></div>
        <div className="w-100 d-flex me-3 mt-4 text-white fw-bolder justify-content-end">
          12/12/2022
        </div>
      </div>
    </>
  );
};

export default HistoryTab;

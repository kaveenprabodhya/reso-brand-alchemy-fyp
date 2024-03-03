import classes from "./settings.module.css";

const Settings = () => {
  return (
    <>
      <div className={classes.horizontalSeparator}></div>
      <div className="d-flex" style={{ height: "400px" }}>
        <div className="d-flex flex-column justify-content-between m-4">
          <div className="d-flex flex-column">
            <button
              className="btn text-white my-3"
              style={{ backgroundColor: "#6423CB" }}
            >
              General
            </button>
            <button
              className="btn text-white"
              style={{ backgroundColor: "#6423CB" }}
            >
              Controls
            </button>
          </div>
          <div className="">
            <button
              className="btn text-white"
              style={{ backgroundColor: "#6423CB" }}
            >
              Logout
            </button>
          </div>
        </div>
        <div
          className={classes.verticalSeparator}
          style={{ height: "100%" }}
        ></div>
        <div className=""></div>
      </div>
    </>
  );
};

export default Settings;

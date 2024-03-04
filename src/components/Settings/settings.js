import { useState } from "react";
import classes from "./settings.module.css";

const Settings = () => {
  const [isGeneralTabState, setGeneralTabState] = useState(true);
  const [isControlTabState, setControlTabState] = useState(false);

  const handleGeneralTab = () => {
    setGeneralTabState(true);
    setControlTabState(false);
  };

  const handleControlTab = () => {
    setControlTabState(true);
    setGeneralTabState(false);
  };

  return (
    <>
      <div className={classes.horizontalSeparator}></div>
      <div className="d-flex" style={{ height: "400px" }}>
        <div className="d-flex flex-column justify-content-between px-2">
          <div className="d-flex flex-column">
            <button
              className="btn text-white my-3"
              style={{ backgroundColor: "#6423CB", width: "130px" }}
              onClick={handleGeneralTab}
            >
              General
            </button>
            <button
              className="btn text-white"
              style={{ backgroundColor: "#6423CB", width: "130px" }}
              onClick={handleControlTab}
            >
              Controls
            </button>
          </div>
          <div className="w-100">
            <button
              className="btn text-white w-100"
              style={{ backgroundColor: "#6423CB", width: "130px" }}
            >
              Logout
            </button>
          </div>
        </div>
        <div
          className={classes.verticalSeparator}
          style={{ height: "100%" }}
        ></div>
        <div className="px-3 py-2">
          {isGeneralTabState && <div>General Tab State</div>}
          {isControlTabState && <div>Control Tab State</div>}
        </div>
      </div>
    </>
  );
};

export default Settings;

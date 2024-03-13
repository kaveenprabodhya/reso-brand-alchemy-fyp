import { useState } from "react";
import classes from "./settings.module.css";
import GeneralTab from "./generalTab";
import ControlsTab from "./controlsTab";

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

  const logout = () => {
    // Remove the stored token
    localStorage.removeItem("userToken");

    // Optionally, remove other stored session info
    // localStorage.removeItem("userInfo");

    // Update state or redirect to login page
  };

  return (
    <>
      <div className="d-flex mb-3" style={{ height: "300px" }}>
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
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
        <div
          className={classes.verticalSeparator}
          style={{ height: "100%" }}
        ></div>
        <div className="px-3 w-100">
          {isGeneralTabState && <GeneralTab />}
          {isControlTabState && <ControlsTab />}
        </div>
      </div>
    </>
  );
};

export default Settings;

import { useState } from "react";
import classes from "./settings.module.css";
import GeneralTab from "./generalTab";
import ControlsTab from "./controlsTab";

const Settings = ({ closeSettingsModal, handleLogout, isLoggedIn }) => {
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

  const logout = async () => {
    try {
      // Making the API request to the login endpoint
      const response = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (response.ok) {
        // Optionally, you could close the login modal and redirect the user
        localStorage.removeItem("access_token");
        handleLogout();
        closeSettingsModal();
        // Redirect user or update UI accordingly
      } else {
        // Handle errors or unsuccessful login attempts
        console.error("Logout failed:", await response.text());
      }
    } catch (error) {
      console.error("Error during the logout process:", error);
    }

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
            {isLoggedIn ? (
              <button
                className="btn text-white w-100"
                style={{ backgroundColor: "#6423CB", width: "130px" }}
                onClick={logout}
              >
                Logout
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div
          className={classes.verticalSeparator}
          style={{ height: "100%" }}
        ></div>
        <div className="px-3 w-100">
          {isGeneralTabState && <GeneralTab isLoggedIn={isLoggedIn} />}
          {isControlTabState && <ControlsTab isLoggedIn={isLoggedIn} />}
        </div>
      </div>
    </>
  );
};

export default Settings;

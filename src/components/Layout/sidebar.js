import classes from "./sidebar.module.css";

const SideBar = ({
  handleAuthModal,
  handleSettingsModal,
  handleProfileModal,
  onHomeClick,
  onHistoryClick,
  isLoggedIn,
  user,
}) => {
  return (
    <>
      <div style={{ backgroundColor: "#7269FF" }}>
        <div
          className="d-flex flex-column justify-content-start m-3 p-2 rounded-2"
          style={{
            width: "198px",
            height: "95vh",
          }}
        >
          <div className="d-flex align-items-center justify-content-center">
            {!isLoggedIn ? (
              <button
                className="btn text-white w-100"
                style={{ backgroundColor: "#6423CB" }}
                onClick={handleAuthModal}
              >
                <i className="fa fa-user pe-2 text-white"></i>
                Login
              </button>
            ) : (
              <button
                className="btn text-white w-100"
                style={{ backgroundColor: "#6423CB" }}
                onClick={handleProfileModal}
              >
                <span className="d-flex align-items-center justify-content-between">
                  <i className="fa fa-user-circle pe-2 text-white fs-4"></i>
                  <div
                    className="w-100 d-flex justify-content-end"
                    style={{ fontSize: "14px", fontWeight: "bold" }}
                  >
                    {user.firstName + " " + user.lastName}
                  </div>
                </span>
              </button>
            )}
          </div>
          <div>
            <div className="d-flex mt-3 align-items-center justify-content-center">
              <div
                className="text-center my-1 rounded-3"
                style={{ width: "170px", border: "1px solid white" }}
              >
                <div>
                  <button
                    className="btn w-100"
                    onClick={onHomeClick}
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    <i
                      className="fa fa-home pe-1"
                      style={{ fontSize: "18px", color: "white" }}
                    ></i>
                    Home
                  </button>
                </div>
              </div>
            </div>

            <div className={classes.horizontalSeparator}></div>
            <div className="d-flex align-items-center justify-content-center">
              <div
                className="text-center my-1 rounded-3"
                style={{ width: "170px", border: "1px solid white" }}
              >
                <div>
                  <button
                    className="btn w-100"
                    onClick={onHistoryClick}
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    <i
                      className="fa fa-history pe-1"
                      style={{ fontSize: "16px", color: "white" }}
                    ></i>
                    History
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="h-100 d-flex flex-column justify-content-end">
            <div className="d-flex align-items-center justify-content-center">
              <button
                className="btn text-white w-100 rounded-3"
                style={{ backgroundColor: "#7F7ACC" }}
                onClick={handleSettingsModal}
              >
                <i className="fa fa-cog pe-1 mt-1 text-white pe-2"></i>
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;

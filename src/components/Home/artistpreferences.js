import classes from "./artistpreference.module.css";
import Mp3Uploader from "./mp3uploader";

const ArtistPreferences = ({
  showStartButton,
  handleStartCapture,
  handleStopCapture,
  handleAudioEnd,
  file,
  handleChange,
  handleClick,
  handleDragLeave,
  handleDragOver,
  handleDrop,
  handleDelete,
  fileInputRef,
  deleted,
}) => {
  return (
    <>
      <div className="container">
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="mb-3 w-100">
            <div className={classes.area}>
              <Mp3Uploader
                styleClasses={classes}
                file={file}
                handleAudioEnd={handleAudioEnd}
                handleChange={handleChange}
                handleClick={handleClick}
                handleDragLeave={handleDragLeave}
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
                handleDelete={handleDelete}
                fileInputRef={fileInputRef}
                deleted={deleted}
              />
            </div>
          </div>
          <div className="d-flex align-self-end">
            <div className="d-flex justify-content-end">
              {showStartButton && (
                <button
                  className="btn text-white my-3"
                  style={{
                    fontSize: "14px",
                    padding: "0",
                    fontWeight: "normal",
                    backgroundColor: "#A753FB",
                    width: "130px",
                    height: "30px",
                  }}
                  onClick={handleStartCapture}
                >
                  Capture
                </button>
              )}
              {!showStartButton && (
                <button
                  className="btn text-white my-3"
                  style={{
                    fontSize: "14px",
                    padding: "0",
                    fontWeight: "normal",
                    backgroundColor: "#A753FB",
                    width: "130px",
                    height: "30px",
                  }}
                  onClick={handleStopCapture}
                >
                  Stop Capture
                </button>
              )}
            </div>
          </div>
          <h6 className="me-auto mt-3 mb-3 text-white">Your prefernces</h6>
          <div
            className="bg-white mt-2"
            style={{ width: "100%", height: "280px", overflowY: "auto" }}
          >
            <div className="bg-secondary w-100 h-50 my-2 opacity-50 text-white">
              <div className="ps-2 pt-2">Emotions Captured</div>
              <div className={classes.horizontalSeparator}></div>
            </div>
            <div className="bg-secondary w-100 h-50 my-2 opacity-50 text-white">
              <div className="ps-2 pt-2">Recommended Colors</div>
              <div className={classes.horizontalSeparator}></div>
            </div>
            <div className="bg-secondary w-100 h-50 my-2 opacity-50 text-white">
              <div className="ps-2 pt-2">Additional Colors</div>
              <div className={classes.horizontalSeparator}></div>
            </div>
          </div>
          <div className="ms-auto">
            <button
              className="btn mt-4 text-white"
              style={{ backgroundColor: "#A753FB", width: "200px" }}
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtistPreferences;

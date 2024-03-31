import classes from "./artistpreference.module.css";
import Mp3Uploader from "../mp3uploader";

const MP3Player = ({
  file,
  handleAudioEnd,
  handleChange,
  handleClick,
  handleDragLeave,
  handleDragOver,
  handleDrop,
  handleDelete,
  fileInputRef,
  deleted,
  showStartButton,
  handleStartCapture,
  handleStopCapture,
}) => {
  return (
    <>
      <div className="mb-3 mt-4 w-100">
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
    </>
  );
};

export default MP3Player;

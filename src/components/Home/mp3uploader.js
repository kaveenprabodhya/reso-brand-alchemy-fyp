import { useEffect, useRef, useState } from "react";
import classes from "./mp3uploader.module.css";

function Mp3Uploader({
  styleClasses,
  handleChange,
  handleDragLeave,
  handleDragOver,
  handleAudioEnd,
  handleClick,
  handleDrop,
  handleDelete,
  file,
  fileInputRef,
  deleted,
}) {
  const [volValue, setVolValue] = useState(1);
  const [isHovering, setIsHovering] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const volumeContainerRef = useRef(null);
  const audioRef = useRef();

  useEffect(() => {
    const currentAudioRef = audioRef.current;

    // Event handler for clicks outside the volume container
    const handleClickOutside = (event) => {
      if (
        volumeContainerRef.current &&
        !volumeContainerRef.current.contains(event.target)
      ) {
        setIsHovering(false);
      }
    };

    // Load metadata handler
    const loadMetadata = () => {
      if (currentAudioRef) {
        setDuration(currentAudioRef.duration);
        setProgress(0);
        setCurrentTime(0);
      }
    };

    // Add event listeners
    document.addEventListener("mousedown", handleClickOutside);
    currentAudioRef.addEventListener("loadedmetadata", loadMetadata);

    if (deleted) {
      // Perform the "delete" actions
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // Reset currentTime
        audioRef.current.src = ""; // Clear the audio source
      }
      setCurrentTime(0);
      setDuration(0);
      setProgress(0);
      // Optionally, if you manage a local file state or similar, reset it here
      // setFile(null);
    }

    // Load the file into the audio element
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      currentAudioRef.src = objectUrl;

      // Cleanup function
      return () => {
        URL.revokeObjectURL(objectUrl);
        currentAudioRef.removeEventListener("loadedmetadata", loadMetadata);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    } else {
      // If there is no file, ensure we cleanup
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        currentAudioRef.removeEventListener("loadedmetadata", loadMetadata);
      };
    }
  }, [file, deleted]);

  const truncateFileName = (name, maxLength) => {
    if (name.length <= maxLength) return name;
    return `${name.substring(0, maxLength)}...`;
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const loadMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const updateProgress = () => {
    if (!audioRef.current || isSeeking) return;

    const current = audioRef.current.currentTime;
    const dur = audioRef.current.duration;
    setCurrentTime(current);
    setProgress((current / dur) * 100);
  };

  const handleSeekChangeStart = (e) => {
    setIsSeeking(true);
  };

  const handleSeekChange = (e) => {
    const newProgress = e.target.value;
    const seekTo = (newProgress / 100) * duration;

    // Update the progress and the display time immediately as the slider moves
    if (audioRef.current && isFinite(seekTo)) {
      setCurrentTime(seekTo);
      setProgress(newProgress); // This will trigger a re-render and update the displayed time

      // Only update the actual currentTime of the audio element when not seeking
      // to avoid interrupting the smooth sliding action.
      if (!isSeeking) {
        audioRef.current.currentTime = seekTo;
      }
    }
  };

  const handleSeekChangeEnd = (e) => {
    setIsSeeking(false);
    // Update the audio element's currentTime once the user has finished seeking
    const newProgress = e.target.value;
    const seekTo = (newProgress / 100) * duration;
    audioRef.current.currentTime = seekTo;
    // Attempt to play the audio only if there is a file
    if (file) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Error occurred when trying to play the audio:", error);
        });
      }
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) {
      return "0:00";
    }
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolValue(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div>
      <div
        id={styleClasses.dropZone}
        className="drop-zone"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      >
        {file
          ? `File: ${truncateFileName(file.name, 20)}`
          : "Drop your mp3 file here"}
        <input
          type="file"
          ref={fileInputRef}
          accept="audio/mpeg"
          onChange={handleChange}
          style={{ display: "none" }}
        />
      </div>
      <div className="d-flex">
        {file && (
          <div className="mt-2">
            <div className={classes.audioPlayerContainer}>
              <div className={classes.audioPlayer}>
                <div className={classes.time}>
                  <div className={classes.current}>
                    {formatTime(currentTime)}
                  </div>
                  <div className={classes.divider}>/</div>
                  <div className={classes.length}>{formatTime(duration)}</div>
                </div>
                <div className={classes.timeline}>
                  <input
                    key={file ? file.name : "no-file"}
                    type="range"
                    onInput={handleSeekChange}
                    onMouseDown={handleSeekChangeStart}
                    onChange={handleSeekChange}
                    onMouseUp={handleSeekChangeEnd}
                    value={isFinite(progress) ? progress : 0}
                    min={0}
                    max={100}
                    step="0.01"
                    disabled={!file}
                    style={{
                      background: `linear-gradient(to right, #202429 ${progress}%, #c2c2c2 ${progress}%)`,
                    }}
                  />
                </div>
                <div
                  ref={volumeContainerRef}
                  className={classes.volumeContainer}
                  onMouseEnter={handleMouseEnter}
                >
                  <div className={classes.volumeButton}>
                    {volValue > 0 && (
                      <span
                        className={`fa fa-volume-up`}
                        style={{ fontSize: "18px" }}
                      ></span>
                    )}

                    {volValue <= 0 && (
                      <span
                        className={`fa fa-volume-off`}
                        style={{ fontSize: "22px" }}
                      ></span>
                    )}
                  </div>
                  <div
                    className={`${classes.volumeSliderContainer}`}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      width: isHovering ? "110px" : "0",
                      padding: isHovering ? "0 16px" : "0",
                    }}
                  >
                    <div className={classes.volumeSlider}>
                      <input
                        type="range"
                        value={volValue}
                        min={0}
                        max={1}
                        step="0.01"
                        onInput={handleVolumeChange}
                        onChange={handleVolumeChange}
                        style={{
                          background: `linear-gradient(to right, #202429 ${
                            volValue * 100
                          }%, #c2c2c2 ${(1 - volValue) * 100}%)`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <audio
          id="audioPlayer"
          className="mt-2"
          ref={audioRef}
          onTimeUpdate={updateProgress}
          onLoadedMetadata={loadMetadata}
          onEnded={handleAudioEnd}
          hidden
          style={{ width: "100%" }}
        ></audio>
        {file && (
          <div className="d-flex flex-column align-self-center mt-2">
            <button className="btn btn-sm text-danger" onClick={handleDelete}>
              X
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Mp3Uploader;

import { useEffect, useRef, useState } from "react";
import EmotionCapture from "./emotioncapture";
import classes from "./home.module.css";
import ArtistPreferences from "./Artist Preferences/artistpreferences";
import io from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";

const Home = ({ isLoggedIn }) => {
  const webcamRef = useRef(null);
  const [showStartButton, setShowStartButton] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [deleted, setDeleted] = useState(false);
  const socket = useRef(null);
  const streamingIntervalRef = useRef(null);
  const [emotionsWithColors, setEmotionsWithColor] = useState({});
  const [imgSrcSelected, setImgSrcSelected] = useState("");
  const [isImgClick, setIsImgClick] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(true);
  const [isCapturing, setIsCapturing] = useState(false);

  const handleOnClickImg = (bool) => setIsImgClick(true);

  const handleSetImgSrc = (src) => setImgSrcSelected(src);

  const handlePlayerVisible = (bool) => setIsPlayerVisible(bool);

  useEffect(() => {
    socket.current = io("http://localhost:5000");

    socket.current.on("server_connect_response", (data) => {
      console.log("Feedback from server:", data.status);
    });

    socket.current.on("emotion_analysis_results", (data) => {
      setEmotionsWithColor((prev) => ({ ...prev, ...data.results }));
      setIsCapturing(false);
    });

    socket.current.on("frame_status", (data) => {
      console.log(data.status);
    });

    socket.current.on("error", (data) => {
      console.log(data);
    });

    return () => {
      if (streamingIntervalRef.current) {
        clearInterval(streamingIntervalRef.current);
      }
      socket.current.off("emotion_analysis_results");
      socket.current.off("server_connect_response");
      socket.current.off("frame_status");
      socket.current.off("error");
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add("dragover");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("dragover");
    const files = e.dataTransfer.files;
    processFiles(files);
  };

  const processFiles = (files) => {
    if (files.length > 0 && files[0].type === "audio/mpeg") {
      setFile(files[0]);
      const audioPlayer = document.getElementById("audioPlayer");
      audioPlayer.src = URL.createObjectURL(files[0]);
      audioPlayer.hidden = false;
    } else {
      // alert("Please select an MP3 file.");
      toast.error("No MP3 File Selected: Please Select your music file first.");
    }
  };

  const handleDelete = () => {
    setFile(null);
    const audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.src = "";
    audioPlayer.hidden = true;
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      setDeleted(true);
    }
    if (webcamRef.current) {
      webcamRef.current.stopStream();
      setShowStartButton(true);
    }
    setIsCapturing(false);
  };

  const handleChange = (e) => {
    processFiles(e.target.files);
    e.target.value = null;
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const togglePlayPause = () => {
    const audioPlayer = document.getElementById("audioPlayer");
    if (audioPlayer) {
      if (isPlaying) {
        audioPlayer.pause();
      } else {
        audioPlayer.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
    // const audioPlayer = document.getElementById("audioPlayer");
    // audioPlayer.currentTime = 0;
    handleDelete();
  };

  const handleStartCapture = () => {
    if (file) {
      if (webcamRef.current) {
        webcamRef.current.startStream();
        setShowStartButton(false);
        togglePlayPause();
      }
      setIsCapturing(true);
    } else {
      // alert("Please choose an MP3 file before starting the capture.");
      toast.error("No MP3 File Selected: Please Select your music file first.");
    }
  };

  const handleStopCapture = () => {
    if (webcamRef.current) {
      webcamRef.current.stopStream();
      setShowStartButton(true);
      togglePlayPause();
      handleDelete();
      if (socket.current) {
        socket.current.disconnect();
      }
      // setIsCapturing(false)
    }
    handlePlayerVisible(false);
  };

  return (
    <>
      <div className="col-7">
        <ToastContainer />
        {isImgClick ? (
          <div className="d-flex justify-content-center align-items-center h-100">
            <img src={imgSrcSelected} alt="" className="img-fluid w-75" />
          </div>
        ) : (
          <EmotionCapture
            webcamRef={webcamRef}
            socket={socket}
            streamingIntervalRef={streamingIntervalRef}
          />
        )}
      </div>
      <div
        className={classes.verticalSeparator}
        style={{ height: "85vh" }}
      ></div>
      <div className="col-3">
        <ArtistPreferences
          handleStartCapture={handleStartCapture}
          handleStopCapture={handleStopCapture}
          showStartButton={showStartButton}
          handleAudioEnd={handleAudioEnd}
          file={file}
          fileInputRef={fileInputRef}
          handleChange={handleChange}
          handleClick={handleClick}
          handleDelete={handleDelete}
          handleDragLeave={handleDragLeave}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          deleted={deleted}
          emotionsWithColors={emotionsWithColors}
          isLoggedIn={isLoggedIn}
          handleOnClickImg={handleOnClickImg}
          handleSetImgSrc={handleSetImgSrc}
          isPlayerVisible={isPlayerVisible}
          isCapturing={isCapturing}
        />
      </div>
    </>
  );
};

export default Home;

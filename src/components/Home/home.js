import { useRef, useState } from "react";
import ArtistPreferences from "./artistpreferences";
import EmotionCapture from "./emotioncapture";
import classes from "./home.module.css";

const Home = () => {
  const webcamRef = useRef(null);
  const [showStartButton, setShowStartButton] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [deleted, setDeleted] = useState(false);
  const [emotionList, setEmotionList] = useState({});

  // const socket = io("http://localhost:5000", {
  //   withCredentials: true,
  //   query: {
  //     token: `Bearer ${localStorage.getItem("access_token")}`,
  //   },
  // });

  // useEffect(() => {
  //   const handleServerConnectStatus = (data) => {
  //     console.log("Feedback from server:", data.status);
  //   };

  //   // Function to process the emotion analysis results
  //   const handleEmotionAnalysisResults = (data) => {
  //     console.log("Emotion Analysis Results:", data.results);
  //     // Process or display the results as needed
  //     setEmotionList(data.results);
  //   };

  //   const handleFrameStatus = (data) => {
  //     console.log(data.status);
  //   };

  //   const handleError = (data) => {
  //     console.log(data);
  //   };

  //   // Add event listener for 'emotion_analysis_results'
  //   socket.on("server_connect_response", handleServerConnectStatus);
  //   // socket.on("emotion_analysis_results", handleEmotionAnalysisResults);
  //   socket.on("frame_status", handleFrameStatus);
  //   socket.on("error", handleError);

  //   // Cleanup function to remove the event listener when the component unmounts or re-renders
  //   return () => {
  //     socket.off("server_connect_response", handleServerConnectStatus);
  //     socket.off("emotion_analysis_results", handleEmotionAnalysisResults);
  //     socket.off("frame_status", handleFrameStatus);
  //     socket.off("error", handleError);
  //   };
  // }, [socket]);

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
      alert("Please select an MP3 file.");
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
  };

  const handleStartCapture = () => {
    if (file) {
      if (webcamRef.current) {
        webcamRef.current.startStream();
        setShowStartButton(false);
        togglePlayPause();
      }
    } else {
      alert("Please choose an MP3 file before starting the capture.");
    }
  };

  const handleStopCapture = () => {
    if (webcamRef.current) {
      webcamRef.current.stopStream();
      setShowStartButton(true);
      togglePlayPause();
      handleDelete();
    }
  };
  return (
    <>
      <div className="col-7">
        <EmotionCapture webcamRef={webcamRef} />
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
          emotions={emotionList}
        />
      </div>
    </>
  );
};

export default Home;

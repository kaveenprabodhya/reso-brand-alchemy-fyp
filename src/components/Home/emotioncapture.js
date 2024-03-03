import { useState } from "react";
import Webcamstreamcapture from "./webcamstreamcapture";
import "./emotioncapture.css";

const EmotionCapture = ({ webcamRef }) => {
  const [isStreaming, setIsStreaming] = useState(false);

  const handleStreamingStatusChange = (status) => {
    setIsStreaming(status);
  };

  return (
    <>
      <div className="container" style={{ height: "100%" }}>
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "100%" }}
        >
          <Webcamstreamcapture
            ref={webcamRef}
            width="640"
            height="480"
            onStreamingStatusChange={handleStreamingStatusChange}
          />
          {!isStreaming && (
            <div className="black-canvas">Camera is not streaming</div>
          )}
        </div>
      </div>
    </>
  );
};

export default EmotionCapture;

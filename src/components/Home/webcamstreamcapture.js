import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  useCallback,
  useEffect,
} from "react";
import io from "socket.io-client";

const WebcamStreamCapture = (
  { width, height, onStreamingStatusChange, frameRate = 10 },
  ref
) => {
  const videoRef = useRef(null);
  const socket = useRef(null);
  const canvasRef = useRef(document.createElement("canvas"));
  const streamingIntervalRef = useRef(null);

  useEffect(() => {
    // Initialize Socket.IO connection
    socket.current = io("http://localhost:5000");

    return () => {
      if (streamingIntervalRef.current) {
        clearInterval(streamingIntervalRef.current);
      }
      socket.current.disconnect();
    };
  }, []);

  const notifyStreamingStatus = useCallback(
    (isStreaming) => {
      if (onStreamingStatusChange) {
        onStreamingStatusChange(isStreaming);
      }
    },
    [onStreamingStatusChange]
  );

  // Function to start streaming
  const startStream = useCallback(async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width, height },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          notifyStreamingStatus(true);

          // Prepare canvas for capturing and sending frames
          const canvas = canvasRef.current;
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");

          // Capture and send frames at specified frame rate
          streamingIntervalRef.current = setInterval(() => {
            ctx.drawImage(videoRef.current, 0, 0, width, height);
            canvas.toBlob((blob) => {
              socket.current.emit("stream_frame", blob);
            }, "image/jpeg");
          }, 1000 / frameRate);
        }
      } catch (error) {
        console.error(error);
        notifyStreamingStatus(false);
      }
    }
  }, [width, height, notifyStreamingStatus, frameRate]);

  // Function to stop streaming
  const stopStream = useCallback(() => {
    if (streamingIntervalRef.current) {
      clearInterval(streamingIntervalRef.current);
      streamingIntervalRef.current = null;
    }
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      notifyStreamingStatus(false);
    }
    socket.emit("stop_stream");
  }, [notifyStreamingStatus]);

  // Expose startStream and stopStream methods to parent through ref
  useImperativeHandle(ref, () => ({
    startStream,
    stopStream,
  }));

  return (
    <video
      ref={videoRef}
      width={width}
      height={height}
      autoPlay
      playsInline
      muted
    ></video>
  );
};

export default forwardRef(WebcamStreamCapture);

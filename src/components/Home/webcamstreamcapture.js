import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from "react";

const WebcamStreamCapture = (
  {
    width,
    height,
    onStreamingStatusChange,
    frameRate = 1000,
    socket,
    streamingIntervalRef,
  },
  ref
) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(document.createElement("canvas"));

  const notifyStreamingStatus = useCallback(
    (isStreaming) => {
      if (onStreamingStatusChange) {
        onStreamingStatusChange(isStreaming);
      }
    },
    [onStreamingStatusChange]
  );

  const frameInterval = 2000;

  const startStream = useCallback(async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width, height },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          notifyStreamingStatus(true);

          const canvas = canvasRef.current;
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");

          streamingIntervalRef.current = setInterval(() => {
            ctx.drawImage(videoRef.current, 0, 0, width, height);
            canvas.toBlob((blob) => {
              socket.current.emit("stream_frame", blob);
              console.log("sent");
            }, "image/jpeg");
          }, frameInterval);
        }
      } catch (error) {
        console.error(error);
        notifyStreamingStatus(false);
      }
    }
  }, [width, height, notifyStreamingStatus, streamingIntervalRef, socket]);

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
    if (socket.current) {
      socket.current.emit("stop_stream");
    }
  }, [notifyStreamingStatus, socket, streamingIntervalRef]);

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

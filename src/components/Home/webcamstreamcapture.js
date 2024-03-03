import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from "react";

const WebcamStreamCapture = (
  { width, height, onStreamingStatusChange },
  ref
) => {
  const videoRef = useRef(null);

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
        }
      } catch (error) {
        console.error(error);
        notifyStreamingStatus(false);
      }
    }
  }, [width, height, notifyStreamingStatus]);

  // Function to stop streaming
  const stopStream = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      notifyStreamingStatus(false);
    }
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
    ></video>
  );
};

export default forwardRef(WebcamStreamCapture);

import React, { useEffect, useRef, useState } from "react";
import { IoArrowBackCircle, IoNotifications } from "react-icons/io5";
import axios from "axios";

const LiveVideoFeed = ({ setActiveComponent }) => {
  const videoRef = useRef(null);
  const [notification, setNotification] = useState("");
  const [isProcessing, setIsProcessing] = useState(false); // State to track if we are processing a frame

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(console.error);

    // Capture frame only when not processing
    let captureInterval = 400; // Time in milliseconds between frame captures, increase this to slow down the frame rate

    setInterval(() => {
      captureAndSendFrame();
    }, captureInterval); // Adjust time based on your requirements

    return () => clearInterval(captureInterval);
  }, [isProcessing]);

  const captureAndSendFrame = () => {
    setIsProcessing(true); // Mark as processing
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      sendFrameToServer(blob);
    }, "image/jpeg");
  };
  const sendFrameToServer = async (blob) => {
    const formData = new FormData();
    formData.append("frame", blob);
    try {
      const response = await axios.post(
        "http://localhost:5000/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setNotification(response.data.prediction);
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false); // Allow new frames to be sent
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setActiveComponent("")}
        className="absolute top-5 left-5 text-lg font-semibold"
      >
        <IoArrowBackCircle className="mr-2" />
        Back
      </button>
      <h1 className="text-2xl font-semibold text-center">Live Video Feed</h1>
      <video ref={videoRef} autoPlay playsInline className="w-full"></video>
      {notification && (
        <div className="absolute bottom-5 right-5 bg-yellow-300 p-4 rounded-lg flex items-center">
          <IoNotifications className="mr-2" />
          <span>{notification}</span>
        </div>
      )}
    </div>
  );
};

export default LiveVideoFeed;

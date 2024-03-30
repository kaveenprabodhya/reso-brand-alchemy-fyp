import { useState } from "react";
import PreferencesTab from "./preferenceTab";
import TextPromptTab from "./textpromt";
import MP3Player from "./mp3player";

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
  emotions,
  isLoggedIn,
  handleOnClickImg,
  handleSetImgSrc,
}) => {
  const [color, setColor] = useState("#fff");
  const [detectedColor, setDetectedColor] = useState("");
  const [preferenceTabSelected, setPreferenceTabSelected] = useState(true);
  const [textpromptTabSelected, setTextPromptTabSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isBrandCreated, setIsBrandCreated] = useState(false);

  const handleSetColor = (color) => setColor(color.hex);
  const handleSetBrandCreated = (bool) => setIsBrandCreated(bool);
  const handleSetIsLoading = (bool) => setIsLoading(bool);

  const handleOnNext = () => {
    setTextPromptTabSelected(true);
    setPreferenceTabSelected(false);
  };

  const handleOnBack = () => {
    setPreferenceTabSelected(true);
    setTextPromptTabSelected(false);
  };

  return (
    <>
      <div className="container">
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          {isLoggedIn ? (
            <>
              {isBrandCreated ? null : (
                <>
                  <MP3Player
                    deleted={deleted}
                    file={file}
                    fileInputRef={fileInputRef}
                    handleAudioEnd={handleAudioEnd}
                    handleChange={handleChange}
                    handleClick={handleClick}
                    handleDelete={handleDelete}
                    handleDragLeave={handleDragLeave}
                    handleDragOver={handleDragOver}
                    handleDrop={handleDrop}
                    handleStartCapture={handleStartCapture}
                    handleStopCapture={handleStopCapture}
                    showStartButton={showStartButton}
                  />
                  <h6 className="me-auto mt-3 mb-3 text-white">
                    Your preferences
                  </h6>
                </>
              )}
              {/* {preferenceTabSelected && (
                <PreferencesTab
                  color={color}
                  handleSetColor={handleSetColor}
                  emotions={emotions}
                  handleOnNext={handleOnNext}
                />
              )}
              {textpromptTabSelected && ( */}
              <TextPromptTab
                handleOnBack={handleOnBack}
                isBrandCreated={isBrandCreated}
                isLoading={isLoading}
                handleSetIsLoading={handleSetIsLoading}
                handleSetBrandCreated={handleSetBrandCreated}
                handleOnClickImg={handleOnClickImg}
                handleSetImgSrc={handleSetImgSrc}
              />
              {/* )} */}
            </>
          ) : (
            <div>Login into Generate Brand Images</div>
          )}
        </div>
      </div>
    </>
  );
};

export default ArtistPreferences;

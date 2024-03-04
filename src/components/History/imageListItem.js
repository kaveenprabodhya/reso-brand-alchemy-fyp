import { useEffect, useState } from "react";
import "./imageListItem.css";

const ImageListItem = ({ imageData, handleLoadImage, isActive }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleDelete = () => {
    setIsPopupOpen(false);
  };

  const handleClosePopup = (e) => {
    if (isPopupOpen) {
      setIsPopupOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isPopupOpen && !event.target.closest(".image-list-item-container")) {
        setIsPopupOpen(false);
      }
    };

    // Attach when the popup is opened and detach when closed
    if (isPopupOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopupOpen]);

  return (
    <>
      <div
        onClick={handleClosePopup}
        className={`image-list-item-container rounded-3 mx-2 mt-2 d-flex align-items-center justify-content-between px-2 ${
          isActive ? "active" : "non-active"
        }`}
      >
        <div className="w-100 me-2" style={{ position: "relative" }}>
          <div
            className="text-dark text-start fw-bold w-100"
            style={{ fontSize: "12px" }}
            onClick={handleLoadImage.bind(this, imageData)}
          >
            {imageData.imgName}
          </div>
        </div>
        <div className={"circle"} onClick={togglePopup}>
          <div>
            <div className={"dot"}></div>
            <div className={"dot"}></div>
            <div className={"dot"}></div>
          </div>
        </div>
        {isPopupOpen && isActive && (
          <div className="popup-menu">
            <div className="popup-item" onClick={handleDelete}>
              Delete
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ImageListItem;

import { useEffect, useState } from "react";
import "./imageListItem.css";

const ImageListItem = ({ imageData, handleLoadImage, isActive }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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

    if (isPopupOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopupOpen]);

  return (
    <>
      <div
        onClick={handleClosePopup}
        className={`image-list-item-container rounded-3 mt-2 d-flex align-items-center justify-content-between ${
          isActive ? "active" : "non-active"
        }`}
      >
        <div
          className="w-100 h-100 d-flex align-items-center"
          style={{ position: "relative", cursor: "pointer" }}
        >
          <div
            className="text-dark fw-bold w-100 ps-2"
            style={{ fontSize: "12px" }}
            onClick={handleLoadImage.bind(this, imageData)}
          >
            {imageData.imgName}
          </div>
        </div>
        <div
          onMouseEnter={() => setIsPopupOpen(true)}
          onMouseLeave={() => setIsPopupOpen(false)}
        >
          <div className="circle">
            <div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
          {isPopupOpen && isActive && (
            <div className="popup-menu">
              <div className="popup-item d-flex justify-content-between align-items-center">
                <div className="d-flex w-100 ms-auto">Download</div>
                <span className="fa fa-arrow-circle-down"></span>
              </div>
              <div className="popup-item d-flex justify-content-between align-items-center">
                <div
                  className="d-flex w-100 ms-auto text-danger"
                  onClick={handleDelete}
                >
                  Delete
                </div>
                <span className="fa fa-trash text-danger"></span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ImageListItem;

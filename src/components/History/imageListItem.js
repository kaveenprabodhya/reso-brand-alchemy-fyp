import { useEffect, useState } from "react";
import "./imageListItem.css";
import { ToastContainer, toast } from "react-toastify";

const ImageListItem = ({
  brandData,
  handleLoadImage,
  isActive,
  handleDeletedImages,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleDelete = () => {
    setIsPopupOpen(false);
    console.log(brandData);
    handleDeletedImages(brandData.id);
    // Assuming you store your JWT in localStorage or manage it through a context/state management library
    const token = localStorage.getItem("access_token");

    fetch(`http://localhost:5000/api/image/delete-batch/${brandData.id}`, {
      method: "DELETE", // Specify the method
      headers: {
        // Include any needed headers. At minimum, you'll need to authenticate.
        Authorization: `Bearer ${token}`, // Assuming you use Bearer token authentication
        "Content-Type": "application/json", // Although not strictly necessary for DELETE, it's good practice
      },
      // No body is needed for a DELETE request in this case
    })
      .then((response) => {
        if (!response.ok) {
          // Handle any errors, such as unauthorized or not found
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON data from the response
      })
      .then((data) => {
        console.log(data.message);
        toast.success("Deleted Successfully.");
        // Handle your success message here
        // Update your UI or state as needed, e.g., removing the deleted items from a list
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
        // Handle any errors, such as displaying an error message to the user
      });
  };

  const handleDownload = () => {
    setIsPopupOpen(false);
    // Check if brandData has a url array
    if (brandData && brandData.imgs && Array.isArray(brandData.imgs)) {
      brandData.imgs.forEach(async (url, index) => {
        try {
          const response = await fetch(url);
          if (!response.ok)
            throw new Error(`Failed to fetch ${url}: ${response.statusText}`);

          const blob = await response.blob();
          const objectURL = window.URL.createObjectURL(blob);

          // Creating an anchor tag to initiate download
          const a = document.createElement("a");
          a.href = objectURL;
          // Providing a default name for the files and appending an index to make each name unique
          a.download = `brand-image-${index + 1}`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);

          // Clean up the object URL after a delay to give the browser time to initiate the download
          setTimeout(() => window.URL.revokeObjectURL(objectURL), 10000);
        } catch (error) {
          console.error("Error downloading image:", error);
        }
      });
    } else {
      // Handle case where the URL array is not present or not as expected
      console.error("No URLs available for download.");
    }
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
      <ToastContainer />
      <div
        onClick={handleClosePopup}
        className={`image-list-item-container rounded-3 mt-2 d-flex align-items-center justify-content-between ${
          isActive ? "active" : "non-active"
        }`}
      >
        <div
          className="w-100 h-100 d-flex align-items-center img-name"
          style={{ position: "relative", cursor: "pointer" }}
        >
          <div
            className="fw-bold w-100 ps-2"
            style={{ fontSize: "12px" }}
            onClick={handleLoadImage.bind(this, brandData)}
          >
            {brandData.brandName}
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
                <div className="d-flex w-100 ms-auto" onClick={handleDownload}>
                  Download
                </div>
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

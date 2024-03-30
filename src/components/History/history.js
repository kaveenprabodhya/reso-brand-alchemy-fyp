import { useRef, useState } from "react";
import ImageList from "./imageList";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HistoryTab = ({
  isLoggedIn,
  handleSetPreviewImgSrc,
  handleOnClickPreviewImg,
}) => {
  const [imageList, setImageList] = useState([]);
  const imgPreviewOneRef = useRef(null);
  const imgPreviewTwoRef = useRef(null);
  const imgPreviewThreeRef = useRef(null);
  const imgPreviewFourRef = useRef(null);
  const imgPreviewFiveRef = useRef(null);

  const [loadedImageData, setLoadedImageData] = useState({});
  const [activeBrandId, setActiveBrandId] = useState(1);

  useEffect(() => {
    fetch("http://localhost:5000/api/image/get-history", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch image history");
        }
      })
      .then((data) => {
        setImageList(data);
        setLoadedImageData(data[0]);
      })
      .catch((error) => {
        // toast.error("Error fetching your history. Please try again later.");
      });
  }, []);

  const handleImgClick = (imgSrc) => {
    handleOnClickPreviewImg(true);
    handleSetPreviewImgSrc(imgSrc);
  };

  const handleLoadImage = (e) => {
    setLoadedImageData(e);
    setActiveBrandId(e.id);
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <ToastContainer />
          <ImageList
            imageList={imageList}
            handleLoadImage={handleLoadImage}
            activeBrandId={activeBrandId}
          />
          <div className="col d-flex flex-column justify-content-center align-items-center">
            {!loadedImageData.imgs ? (
              <div className="text-white" style={{ fontSize: "20px" }}>
                Start Generating Your First Dynamic Brand Brand Image
              </div>
            ) : (
              <>
                <div
                  className="w-100 text-white fw-bolder d-flex justify-content-end align-items-end pe-3 my-3 pb-1"
                  style={{ fontSize: "18px" }}
                >
                  {loadedImageData.created ? loadedImageData.created : ""}
                </div>
                <div className="container h-100 d-flex flex-column mt-2">
                  <div className="row d-flex justify-content-center">
                    <div className="col-3 border border-3 mx-3 p-1 d-flex align-items-center">
                      <img
                        src={
                          loadedImageData?.imgs && loadedImageData.imgs[0]
                            ? loadedImageData.imgs[0]
                            : ""
                        }
                        className="img-fluid"
                        alt=""
                        ref={imgPreviewOneRef}
                        onClick={() =>
                          handleImgClick(imgPreviewOneRef.current?.src)
                        }
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <div className="col-3 border border-3 mx-3 p-1 d-flex align-items-center">
                      <img
                        src={
                          loadedImageData?.imgs && loadedImageData.imgs[1]
                            ? loadedImageData.imgs[1]
                            : ""
                        }
                        className="img-fluid"
                        alt=""
                        ref={imgPreviewTwoRef}
                        onClick={() =>
                          handleImgClick(imgPreviewTwoRef.current?.src)
                        }
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <div className="col-3 border border-3 mx-3 p-1 d-flex align-items-center">
                      <img
                        src={
                          loadedImageData?.imgs && loadedImageData.imgs[2]
                            ? loadedImageData.imgs[2]
                            : ""
                        }
                        className="img-fluid"
                        alt=""
                        ref={imgPreviewThreeRef}
                        onClick={() =>
                          handleImgClick(imgPreviewThreeRef.current?.src)
                        }
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </div>
                  <div className="row mt-5 d-flex justify-content-center">
                    <div className="col-3 border border-3 mx-3 p-1 d-flex align-items-center">
                      <img
                        src={
                          loadedImageData?.imgs && loadedImageData.imgs[3]
                            ? loadedImageData.imgs[3]
                            : ""
                        }
                        className="img-fluid"
                        alt=""
                        ref={imgPreviewFourRef}
                        onClick={() =>
                          handleImgClick(imgPreviewFourRef.current?.src)
                        }
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <div className="col-3 border border-3 mx-3 p-1 d-flex align-items-center">
                      <img
                        src={
                          loadedImageData?.imgs && loadedImageData.imgs[4]
                            ? loadedImageData.imgs[4]
                            : ""
                        }
                        className="img-fluid"
                        alt=""
                        ref={imgPreviewFiveRef}
                        onClick={() =>
                          handleImgClick(imgPreviewFiveRef.current?.src)
                        }
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <div
          className="w-100 h-100 d-flex justify-content-center align-items-center text-white"
          style={{ fontSize: "20px", fontWeight: "bold" }}
        >
          Login to access your image history
        </div>
      )}
    </>
  );
};

export default HistoryTab;

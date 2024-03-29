import { useState } from "react";
import classes from "./history.module.css";
import ImageList from "./imageList";
import { useEffect } from "react";

const HistoryTab = ({ isLoggedIn }) => {
  const [imageList, setImageList] = useState([]);
  const [loadedImageData, setLoadedImageData] = useState({});
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    const data = [
      {
        id: 1,
        imgName: "RBV logo",
        imgSrc:
          "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.1395880969.1709510400&semt=ais",
        created: "12/12/2022",
      },
      {
        id: 2,
        imgName: "Freedom logo",
        imgSrc:
          "https://img.freepik.com/free-vector/golden-bird-logo-design_1195-336.jpg",
        created: "2/3/2022",
      },
    ];
    setImageList(data);
    setLoadedImageData(data[0]);
    setActiveImage(data[0].imgName);
  }, []);

  const handleLoadImage = (e) => {
    setLoadedImageData(e);
    setActiveImage(e.imgName);
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          {" "}
          <ImageList
            imageList={imageList}
            handleLoadImage={handleLoadImage}
            activeImage={activeImage}
          />
          <div className="col d-flex flex-column justify-content-center align-items-center">
            <div
              className={`${classes.imageContainer} flex-column border border-3`}
            >
              {loadedImageData && (
                <div className="d-flex justify-content-center align-items-center w-100 h-100">
                  <img
                    className={classes.brandImage}
                    src={loadedImageData.imgSrc}
                    alt="img-preview"
                    width="300px"
                    height="300px"
                  />
                </div>
              )}
              <div className="w-100 text-white fw-bolder d-flex justify-content-end align-items-end pe-2 pb-1">
                {loadedImageData.created}
              </div>
            </div>
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
